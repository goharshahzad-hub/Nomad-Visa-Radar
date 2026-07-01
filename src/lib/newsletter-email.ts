import { countries, latestUpdates } from "@/lib/visa-data";
import { siteConfig } from "@/lib/site";

type NewsletterEmail = {
  subject: string;
  html: string;
  text: string;
};

type NewsletterEmailInput = {
  firstName?: string | null;
  unsubscribeUrl: string;
};

function escapeHtml(value: string) {
  return value.replace(/[&<>'"]/g, (character) => {
    const entities: Record<string, string> = {
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      "'": "&#39;",
      '"': "&quot;",
    };
    return entities[character];
  });
}

function greeting(firstName?: string | null) {
  return firstName?.trim() ? `Hi ${escapeHtml(firstName.trim())},` : "Hello,";
}

function textGreeting(firstName?: string | null) {
  return firstName?.trim() ? `Hi ${firstName.trim()},` : "Hello,";
}

function shell({ preview, body, unsubscribeUrl }: { preview: string; body: string; unsubscribeUrl: string }) {
  return `<!doctype html>
<html lang="en">
  <head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
  <body style="margin:0;background:#eef2f3;color:#15212b;font-family:Arial,Helvetica,sans-serif">
    <div style="display:none;max-height:0;overflow:hidden;opacity:0">${escapeHtml(preview)}</div>
    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background:#eef2f3">
      <tr><td align="center" style="padding:24px 12px">
        <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="max-width:640px;background:#ffffff;border:1px solid #dbe4e7">
          <tr><td style="background:#101d26;padding:26px 30px;color:#ffffff">
            <div style="font-size:12px;line-height:18px;letter-spacing:1.4px;text-transform:uppercase;color:#68d6b1">Official-source visa intelligence</div>
            <div style="margin-top:7px;font-size:24px;line-height:30px;font-weight:700">Nomad Visa Radar</div>
          </td></tr>
          ${body}
          <tr><td style="padding:24px 30px;background:#f7f9f9;border-top:1px solid #dbe4e7;color:#64727b;font-size:12px;line-height:19px">
            You are receiving this because you subscribed to Nomad Visa Radar. Visa rules can vary by nationality, consulate, and filing date; verify the official source before acting.<br>
            <a href="${unsubscribeUrl}" style="color:#16795f;text-decoration:underline">Unsubscribe in one click</a> &nbsp;|&nbsp;
            <a href="${siteConfig.url}/contact" style="color:#16795f;text-decoration:underline">Report an outdated detail</a>
          </td></tr>
        </table>
      </td></tr>
    </table>
  </body>
</html>`;
}

function button(href: string, label: string) {
  return `<a href="${href}" style="display:inline-block;background:#176f59;color:#ffffff;text-decoration:none;font-size:14px;font-weight:700;padding:13px 18px;border-radius:6px">${label}</a>`;
}

export function buildWelcomeNewsletterEmail(input: NewsletterEmailInput): NewsletterEmail {
  const personalGreeting = greeting(input.firstName);
  const subject = input.firstName?.trim()
    ? `${input.firstName.trim()}, your Nomad Visa Radar briefing is ready`
    : "Your Nomad Visa Radar briefing is ready";
  const body = `
    <tr><td style="padding:34px 30px 12px">
      <div style="font-size:16px;line-height:25px;color:#45545d">${personalGreeting}</div>
      <h1 style="margin:10px 0 14px;font-size:30px;line-height:38px;color:#15212b">Welcome to a calmer way to research nomad visas.</h1>
      <p style="margin:0;font-size:16px;line-height:27px;color:#45545d">Each Monday, you will receive a short editor-led briefing: the changes worth knowing, why they matter, the income and fee figures that affect planning, and direct links to the official pages.</p>
    </td></tr>
    <tr><td style="padding:20px 30px">
      <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="border:1px solid #dbe4e7;background:#f7f9f9">
        <tr><td style="padding:20px">
          <div style="font-size:12px;font-weight:700;text-transform:uppercase;color:#9a6a13">Your first three useful steps</div>
          <p style="margin:13px 0 7px;font-size:15px;line-height:23px"><strong>1. Build a shortlist.</strong> Start with income eligibility, then compare duration, dependents, and processing.</p>
          <p style="margin:7px 0;font-size:15px;line-height:23px"><strong>2. Read the official source.</strong> Every material update links back to a government or immigration page.</p>
          <p style="margin:7px 0 0;font-size:15px;line-height:23px"><strong>3. Keep a backup route.</strong> Appointments and document rules change, so compare at least two realistic countries.</p>
        </td></tr>
      </table>
    </td></tr>
    <tr><td style="padding:6px 30px 36px">
      ${button(`${siteConfig.url}/countries`, "Explore visa countries")}
      <span style="display:inline-block;width:8px"></span>
      <a href="${siteConfig.url}/compare" style="display:inline-block;color:#176f59;font-size:14px;font-weight:700;padding:13px 8px">Compare routes</a>
    </td></tr>`;

  return {
    subject,
    html: shell({
      preview: "Your weekly briefing will focus on useful changes, official sources, income and fees.",
      body,
      unsubscribeUrl: input.unsubscribeUrl,
    }),
    text: `${textGreeting(input.firstName)}\n\nWelcome to a calmer way to research nomad visas. Each Monday you will receive the changes worth knowing, why they matter, key income and fee figures, and links to official sources.\n\nStart here: ${siteConfig.url}/countries\nCompare routes: ${siteConfig.url}/compare\n\nUnsubscribe: ${input.unsubscribeUrl}`,
  };
}

export function buildWeeklyNewsletterEmail(input: NewsletterEmailInput): NewsletterEmail {
  const updates = latestUpdates.slice(0, 3);
  const comparisonCountries = updates
    .map((update) => countries.find((country) => country.slug === update.countrySlug))
    .filter((country): country is (typeof countries)[number] => Boolean(country))
    .slice(0, 2);
  const firstName = input.firstName?.trim();
  const subject = firstName
    ? `${firstName}, 3 visa changes worth knowing this week`
    : "3 nomad visa changes worth knowing this week";
  const updateRows = updates
    .map(
      (update, index) => `<tr><td style="padding:20px 0;${index ? "border-top:1px solid #dbe4e7;" : ""}">
        <div style="font-size:12px;font-weight:700;text-transform:uppercase;color:#176f59">${escapeHtml(update.countryName)} · ${escapeHtml(update.date)}</div>
        <h2 style="margin:7px 0 8px;font-size:19px;line-height:26px;color:#15212b">${escapeHtml(update.title)}</h2>
        <p style="margin:0 0 10px;font-size:15px;line-height:24px;color:#45545d">${escapeHtml(update.summary)}</p>
        <p style="margin:0;font-size:13px;line-height:21px;color:#64727b"><strong>Why it matters:</strong> Recheck eligibility and evidence before paying for appointments, translations, or relocation bookings.</p>
        <p style="margin:9px 0 0"><a href="${update.officialUrl}" style="color:#176f59;font-size:13px;font-weight:700">Read the official source →</a></p>
      </td></tr>`,
    )
    .join("");
  const comparisonRows = comparisonCountries
    .map(
      (country) => `<tr>
        <td style="padding:13px 10px;border-top:1px solid #dbe4e7;font-size:14px;font-weight:700">${escapeHtml(country.countryName)}</td>
        <td style="padding:13px 10px;border-top:1px solid #dbe4e7;font-size:14px;color:#45545d">${escapeHtml(country.minimumIncome)}</td>
        <td style="padding:13px 10px;border-top:1px solid #dbe4e7;font-size:14px;color:#45545d">${escapeHtml(country.visaFee)}</td>
      </tr>`,
    )
    .join("");
  const body = `
    <tr><td style="padding:34px 30px 8px">
      <div style="font-size:16px;line-height:25px;color:#45545d">${greeting(input.firstName)}</div>
      <h1 style="margin:10px 0 12px;font-size:29px;line-height:37px;color:#15212b">Three changes worth your attention</h1>
      <p style="margin:0;font-size:16px;line-height:26px;color:#45545d">This is the useful version: what changed, why it matters to a real application, and where to verify it.</p>
    </td></tr>
    <tr><td style="padding:10px 30px 4px"><table role="presentation" width="100%" cellspacing="0" cellpadding="0">${updateRows}</table></td></tr>
    ${comparisonCountries.length ? `<tr><td style="padding:22px 30px">
      <h2 style="margin:0 0 12px;font-size:20px;line-height:27px">Quick planning comparison</h2>
      <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="border:1px solid #dbe4e7">
        <tr style="background:#f0f6f4"><th align="left" style="padding:11px 10px;font-size:12px;text-transform:uppercase">Country</th><th align="left" style="padding:11px 10px;font-size:12px;text-transform:uppercase">Eligibility income</th><th align="left" style="padding:11px 10px;font-size:12px;text-transform:uppercase">Visa fee</th></tr>
        ${comparisonRows}
      </table>
    </td></tr>` : ""}
    <tr><td style="padding:6px 30px 22px">
      <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background:#fff7e8;border-left:4px solid #d39a2d"><tr><td style="padding:17px 18px">
        <div style="font-size:12px;font-weight:700;text-transform:uppercase;color:#8a5d0b">Planning note of the week</div>
        <p style="margin:8px 0 0;font-size:14px;line-height:23px;color:#45545d">Do not use the income threshold as the whole decision. Match the threshold to your evidence pattern: salary, invoices, company distributions, and bank receipts should tell one consistent story.</p>
      </td></tr></table>
    </td></tr>
    <tr><td style="padding:4px 30px 36px">${button(`${siteConfig.url}/latest-updates`, "See every verified update")}</td></tr>`;
  const textUpdates = updates
    .map((update) => `${update.countryName}: ${update.title}\n${update.summary}\nOfficial source: ${update.officialUrl}`)
    .join("\n\n");

  return {
    subject,
    html: shell({
      preview: "Three verified visa changes, an income and fee comparison, and one practical filing tip.",
      body,
      unsubscribeUrl: input.unsubscribeUrl,
    }),
    text: `${textGreeting(input.firstName)}\n\nTHREE CHANGES WORTH YOUR ATTENTION\n\n${textUpdates}\n\nPlanning note: Match the income threshold to clear evidence. Salary, invoices, distributions, and bank receipts should tell one consistent story.\n\nAll updates: ${siteConfig.url}/latest-updates\nUnsubscribe: ${input.unsubscribeUrl}`,
  };
}
