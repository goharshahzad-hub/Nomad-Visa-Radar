insert into public.countries (country_name, slug, flag, region, status) values
  ('Portugal', 'portugal', '🇵🇹', 'Europe', 'active'),
  ('Spain', 'spain', '🇪🇸', 'Europe', 'active'),
  ('Croatia', 'croatia', '🇭🇷', 'Europe', 'active'),
  ('Estonia', 'estonia', '🇪🇪', 'Europe', 'active'),
  ('Malta', 'malta', '🇲🇹', 'Europe', 'active'),
  ('Greece', 'greece', '🇬🇷', 'Europe', 'active'),
  ('Italy', 'italy', '🇮🇹', 'Europe', 'active'),
  ('Hungary', 'hungary', '🇭🇺', 'Europe', 'active'),
  ('Latvia', 'latvia', '🇱🇻', 'Europe', 'active'),
  ('Romania', 'romania', '🇷🇴', 'Europe', 'active'),
  ('Czechia', 'czechia', '🇨🇿', 'Europe', 'active'),
  ('Germany', 'germany', '🇩🇪', 'Europe', 'active'),
  ('Iceland', 'iceland', '🇮🇸', 'Europe', 'active'),
  ('Barbados', 'barbados', '🇧🇧', 'Americas', 'active'),
  ('Antigua and Barbuda', 'antigua-and-barbuda', '🇦🇬', 'Americas', 'active'),
  ('Costa Rica', 'costa-rica', '🇨🇷', 'Americas', 'active'),
  ('Brazil', 'brazil', '🇧🇷', 'Americas', 'active'),
  ('Colombia', 'colombia', '🇨🇴', 'Americas', 'active'),
  ('Ecuador', 'ecuador', '🇪🇨', 'Americas', 'active'),
  ('Argentina', 'argentina', '🇦🇷', 'Americas', 'active'),
  ('Uruguay', 'uruguay', '🇺🇾', 'Americas', 'active'),
  ('United Arab Emirates', 'united-arab-emirates', '🇦🇪', 'Middle East', 'active'),
  ('Thailand', 'thailand', '🇹🇭', 'Asia', 'active'),
  ('Malaysia', 'malaysia', '🇲🇾', 'Asia', 'active'),
  ('Japan', 'japan', '🇯🇵', 'Asia', 'active'),
  ('South Korea', 'south-korea', '🇰🇷', 'Asia', 'active'),
  ('Indonesia', 'indonesia', '🇮🇩', 'Asia', 'active'),
  ('Mauritius', 'mauritius', '🇲🇺', 'Africa', 'active'),
  ('Seychelles', 'seychelles', '🇸🇨', 'Africa', 'active'),
  ('Namibia', 'namibia', '🇳🇦', 'Africa', 'active'),
  ('Cape Verde', 'cape-verde', '🇨🇻', 'Africa', 'active'),
  ('Georgia', 'georgia', '🇬🇪', 'Asia', 'active')
on conflict (slug) do update set
  country_name = excluded.country_name,
  flag = excluded.flag,
  region = excluded.region,
  status = excluded.status,
  updated_at = now();

insert into public.visa_programs (
  country_id, visa_program_name, minimum_income, minimum_income_label, visa_fee,
  visa_fee_label, duration, duration_months, renewable, dependents_allowed,
  tax_summary, documents_required, processing_time, application_url,
  official_government_url, last_verified, status
)
select c.id, v.visa_program_name, v.minimum_income, v.minimum_income_label, v.visa_fee,
  v.visa_fee_label, v.duration, v.duration_months, v.renewable, v.dependents_allowed,
  v.tax_summary, v.documents_required, v.processing_time, v.application_url,
  v.official_government_url, v.last_verified::date, v.status
from (values
  ('Portugal', 'D8 Remote Work Visa', 3800, 'About EUR 3,480/month', 180, 'EUR 90-180', '12 months, residence path available', 12, true, true, 'Foreign income planning is possible, but Portuguese tax exposure should be modeled.', array['Valid passport','Proof of remote work or freelance income','Health insurance','Clean criminal record','Accommodation evidence'], '60-90 days', 'https://vistos.mne.gov.pt/en/national-visas/necessary-documentation/temporary-stay', 'https://vistos.mne.gov.pt/en/', '2026-06-14', 'active'),
  ('Spain', 'International Teleworker Visa', 2900, 'About EUR 2,646/month', 90, 'Varies by consulate', '12 months visa, residence renewal available', 12, true, true, 'A special inbound-worker tax regime may apply for eligible applicants.', array['Valid passport','Remote work contract','Health insurance','Criminal record certificate','Proof of qualifications'], '20-45 days', 'https://www.exteriores.gob.es/Consulados/londres/en/ServiciosConsulares/Paginas/Consular/Digital-Nomad-Visa.aspx', 'https://www.exteriores.gob.es/', '2026-06-14', 'active'),
  ('Croatia', 'Digital Nomad Temporary Stay', 3150, 'About EUR 2,870/month', 100, 'EUR 60-100', 'Up to 12 months', 12, false, true, 'Foreign remote income is commonly treated favorably under the digital nomad stay.', array['Valid passport','Proof of purpose','Health insurance','Means of subsistence','Address in Croatia'], '30-60 days', 'https://mup.gov.hr/aliens-281621/stay-and-work/digital-nomads/286833', 'https://mup.gov.hr/', '2026-06-14', 'active'),
  ('Estonia', 'Digital Nomad Visa', 4900, 'EUR 4,500/month', 100, 'EUR 80-100', 'Up to 12 months', 12, false, true, 'Tax residence may arise after extended stays; Estonia is precise but not tax-free.', array['Valid passport','Remote work proof','Income proof','Health insurance','Application form'], '15-30 days', 'https://www.e-resident.gov.ee/nomadvisa/', 'https://www.e-resident.gov.ee/', '2026-06-14', 'active'),
  ('Malta', 'Nomad Residence Permit', 3800, 'EUR 42,000/year', 325, 'EUR 300', '12 months, renewable', 12, true, true, 'Foreign-source income treatment can be favorable, but remittance and residence rules matter.', array['Valid passport','Remote work proof','Health insurance','Background check','Rental or address proof'], '30-45 days', 'https://residencymalta.gov.mt/nomad-residence-permit/', 'https://residencymalta.gov.mt/', '2026-06-14', 'active'),
  ('Greece', 'Digital Nomad Visa', 3820, 'EUR 3,500/month', 150, 'EUR 75-150', '12 months, residence renewal available', 12, true, true, 'Tax incentives may apply for qualifying newcomers, but standard residence rules still apply.', array['Valid passport','Remote work proof','Income proof','Health insurance','Criminal record certificate'], '30-60 days', 'https://www.mfa.gr/en/visas/visas-for-foreigners-traveling-to-greece/national-visas.html', 'https://www.mfa.gr/', '2026-06-14', 'active'),
  ('Italy', 'Digital Nomad and Remote Worker Visa', 2550, 'About EUR 28,000/year', 125, 'EUR 116', '12 months, renewable', 12, true, true, 'Tax residence can trigger worldwide income taxation; review impatriate and local rules.', array['Valid passport','Highly qualified work proof','Income proof','Health insurance','Accommodation evidence'], '30-90 days', 'https://vistoperitalia.esteri.it/home/en', 'https://vistoperitalia.esteri.it/', '2026-06-14', 'active'),
  ('Hungary', 'White Card', 3270, 'EUR 3,000/month', 120, 'About EUR 110', '12 months, renewable once', 12, true, false, 'Best for solo applicants; tax treatment depends on days in country and source.', array['Valid passport','Remote work proof','Income proof','Health insurance','Accommodation evidence'], '30 days', 'https://oif.gov.hu/factsheets/residence-permit-for-digital-nomads-white-card', 'https://oif.gov.hu/', '2026-06-14', 'active'),
  ('Latvia', 'Long-Stay Remote Work Visa', 4200, 'About EUR 3,840/month', 65, 'EUR 60', '12 months, renewable', 12, true, true, 'Strong for EU-adjacent remote work, with standard tax residency analysis needed.', array['Valid passport','Employment proof','Income proof','Health insurance','Address evidence'], '15-30 days', 'https://www.pmlp.gov.lv/en/long-stay-visa-remote-work', 'https://www.pmlp.gov.lv/', '2026-06-14', 'active'),
  ('Romania', 'Digital Nomad Visa', 4300, 'About EUR 3,950/month', 130, 'Varies by consulate', '12 months, renewable', 12, true, true, 'Romania can be cost-efficient, but local tax residence should be modeled before renewal.', array['Valid passport','Remote work proof','Income proof','Health insurance','Criminal record certificate'], '30-60 days', 'https://www.mae.ro/en/node/2035', 'https://www.mae.ro/', '2026-06-14', 'active'),
  ('Czechia', 'Digital Nomad Program', 3000, 'About 1.5x average wage', 110, 'CZK 2,500', 'Up to 12 months', 12, true, true, 'Often paired with specialist employment or trade-license planning.', array['Valid passport','Qualifying work proof','Income proof','Health insurance','Accommodation evidence'], '45-90 days', 'https://www.mpo.gov.cz/en/foreign-trade/economic-migration/digital-nomad-program--275084/', 'https://www.mpo.gov.cz/', '2026-06-14', 'active'),
  ('Germany', 'Freelance Residence Permit', 2500, 'Case-by-case viability proof', 110, 'EUR 100', '6-36 months', 24, true, true, 'Applicants should expect German tax and freelance registration duties.', array['Valid passport','Freelance plan','Client letters','Health insurance','Address registration'], '60-120 days', 'https://service.berlin.de/dienstleistung/328332/en/', 'https://service.berlin.de/', '2026-06-14', 'active'),
  ('Iceland', 'Long-Term Visa for Remote Workers', 7200, 'ISK 1,000,000/month', 90, 'ISK 12,200', 'Up to 180 days', 6, false, true, 'Designed for short stays; high income and high living costs make it selective.', array['Valid passport','Remote work proof','Income proof','Health insurance','No local employment proof'], '30-60 days', 'https://island.is/en/get-long-term-visa-for-remote-workers', 'https://island.is/', '2026-06-14', 'active'),
  ('Barbados', 'Welcome Stamp', 4167, 'USD 50,000/year', 2000, 'USD 2,000 individual', '12 months', 12, true, true, 'Welcome Stamp holders are generally not taxed on foreign income by Barbados under the program.', array['Valid passport','Income declaration','Health insurance','Passport photo','Application form'], '7-14 days', 'https://www.barbadoswelcomestamp.bb/', 'https://www.barbadoswelcomestamp.bb/', '2026-06-14', 'active'),
  ('Antigua and Barbuda', 'Nomad Digital Residence', 4167, 'USD 50,000/year', 1500, 'USD 1,500 individual', 'Up to 24 months', 24, false, true, 'Foreign remote income is generally not taxed locally under the nomad residence program.', array['Valid passport','Remote work proof','Income proof','Health insurance','Police clearance'], '7-14 days', 'https://nomad.gov.ag/', 'https://nomad.gov.ag/', '2026-06-14', 'active'),
  ('Costa Rica', 'Stay for Remote Workers and Service Providers', 3000, 'USD 3,000/month', 190, 'USD 100 plus issuance fees', '12 months, renewable once', 12, true, true, 'Participants may receive local income tax exemptions on qualifying foreign-source income.', array['Valid passport','Income bank statements','Health insurance','Application form','Fee receipt'], '15-30 days', 'https://www.visitcostarica.com/en/costa-rica/digital-nomads', 'https://www.migracion.go.cr/', '2026-06-14', 'active'),
  ('Brazil', 'VITEM XIV Digital Nomad Visa', 1500, 'USD 1,500/month or savings', 120, 'Varies by consulate', '12 months, renewable', 12, true, true, 'Longer stays can create Brazilian tax residence; remote workers should plan around day count.', array['Valid passport','Remote work proof','Income proof','Health insurance','Criminal record certificate'], '15-45 days', 'https://www.gov.br/mre/pt-br/embaixada-helsinque/consular-services/visas/vitem-xiv-digital-nomad', 'https://www.gov.br/mre/', '2026-06-14', 'active'),
  ('Colombia', 'Visa V Digital Nomads', 900, 'About USD 900/month', 177, 'About USD 177', 'Up to 24 months', 24, true, true, 'Low income threshold, but tax residence can apply after prolonged presence.', array['Valid passport','Remote work letter','Income proof','Health insurance','Motivation letter'], '10-30 days', 'https://www.cancilleria.gov.co/tramites_servicios/visa/v-digital-nomads', 'https://www.cancilleria.gov.co/', '2026-06-14', 'active'),
  ('Ecuador', 'Rentista for Remote Work', 1380, 'About USD 1,380/month', 460, 'About USD 460', 'Up to 24 months', 24, true, true, 'Foreign income planning can be efficient, but residence and source rules should be checked.', array['Valid passport','Income proof','Health insurance','Criminal record certificate','Application form'], '30-60 days', 'https://www.gob.ec/mremh/tramites/concesion-visa-residencia-temporal-rentista-trabajo-remoto', 'https://www.gob.ec/', '2026-06-14', 'active'),
  ('Argentina', 'Digital Nomad Visa', 2500, 'Proof of sufficient remote income', 200, 'Varies by nationality', '180 days, extendable', 6, true, false, 'Shorter stays reduce tax complexity; longer plans need Argentine tax advice.', array['Valid passport','Remote work proof','Income proof','Health insurance','Background declaration'], '10-30 days', 'https://www.argentina.gob.ar/servicio/tramitacion-de-visa-para-nomades-digitales', 'https://www.argentina.gob.ar/', '2026-06-14', 'active'),
  ('Uruguay', 'Provisional Identity Sheet for Digital Nomads', 2000, 'Proof of remote income', 25, 'Low administrative fee', '6-12 months', 12, true, true, 'Uruguay can be attractive for foreign-source income planning, subject to residence rules.', array['Valid passport','Remote work proof','Income proof','Health insurance','Application form'], '10-30 days', 'https://www.gub.uy/tramites/hoja-identidad-provisoria-nomades-digitales', 'https://www.gub.uy/', '2026-06-14', 'active'),
  ('United Arab Emirates', 'Virtual Working Programme', 3500, 'USD 3,500/month', 611, 'About USD 611', '12 months', 12, true, true, 'No personal income tax in the UAE, with residency and corporate considerations for founders.', array['Valid passport','Employment proof','Income proof','Health insurance','Passport photo'], '5-15 days', 'https://www.visitdubai.com/en/business-in-dubai/start-a-business/virtual-working-programme', 'https://www.visitdubai.com/', '2026-06-14', 'active'),
  ('Thailand', 'Destination Thailand Visa', 1400, 'THB 500,000 funds evidence', 275, 'THB 10,000', '5-year multiple entry, 180 days per stay', 60, true, true, 'Long stayers should watch Thai tax-residence rules, especially after repeated 180-day stays.', array['Valid passport','Financial evidence','Remote work or soft power proof','Photo','Application form'], '5-20 days', 'https://www.thaievisa.go.th/visa/dtv-visa', 'https://www.thaievisa.go.th/', '2026-06-14', 'active'),
  ('Malaysia', 'DE Rantau Nomad Pass', 2000, 'USD 24,000/year', 215, 'MYR 1,000', '3-12 months, renewable', 12, true, true, 'Malaysia is cost-efficient; tax outcome depends on duration, employment structure, and source.', array['Valid passport','Digital work proof','Income proof','Health insurance','CV or portfolio'], '4-8 weeks', 'https://mdec.my/derantau/foreign', 'https://mdec.my/', '2026-06-14', 'active'),
  ('Japan', 'Digital Nomad Designated Activities Visa', 5600, 'JPY 10,000,000/year', 60, 'Varies by nationality', 'Up to 6 months', 6, false, true, 'Short duration limits tax exposure, but applicants need private insurance and high income.', array['Valid passport','Income proof','Remote work proof','Health insurance','Itinerary'], '5-30 days', 'https://www.moj.go.jp/isa/applications/status/designatedactivities51.html', 'https://www.moj.go.jp/isa/', '2026-06-14', 'active'),
  ('South Korea', 'Workation Visa', 5200, 'About KRW 85 million/year', 70, 'Varies by consulate', '12 months, extendable', 12, true, true, 'High-income route with strong infrastructure; tax exposure depends on stay length.', array['Valid passport','Employment proof','Income proof','Health insurance','Criminal record certificate'], '10-30 days', 'https://www.visa.go.kr/', 'https://www.visa.go.kr/', '2026-06-14', 'active'),
  ('Indonesia', 'Remote Worker Visa', 5000, 'USD 60,000/year', 150, 'Varies by stay permit', 'Up to 12 months', 12, true, true, 'Indonesia offers attractive lifestyle economics; tax residence and foreign-income rules need review.', array['Valid passport','Remote work proof','Income proof','Health insurance','Address evidence'], '7-30 days', 'https://molina.imigrasi.go.id/', 'https://molina.imigrasi.go.id/', '2026-06-14', 'active'),
  ('Mauritius', 'Premium Visa', 1500, 'USD 1,500/month', 0, 'No government fee', 'Up to 12 months', 12, true, true, 'A standout low-fee option; foreign income can be favorable if funds are not locally sourced.', array['Valid passport','Remote work proof','Income proof','Health insurance','Accommodation evidence'], '2-5 days', 'https://residency.mu/live/mauritius-premium-visa/', 'https://residency.mu/', '2026-06-14', 'active'),
  ('Seychelles', 'Seychelles Workcation Program', 2000, 'Proof of funds', 50, 'EUR 45', 'Up to 12 months', 12, false, true, 'Short-term island stay with low bureaucracy; tax exposure depends on residence facts.', array['Valid passport','Proof of employment','Funds evidence','Health insurance','Accommodation evidence'], '2-14 days', 'https://workcation.seychelles.travel/', 'https://workcation.seychelles.travel/', '2026-06-14', 'active'),
  ('Namibia', 'Digital Nomad Visa', 2000, 'USD 2,000/month', 124, 'About USD 124', 'Up to 6 months', 6, false, true, 'Compelling short-stay route for remote workers seeking lower density and nature access.', array['Valid passport','Remote work proof','Income proof','Health insurance','Police clearance'], '14-30 days', 'https://nipdb.com/digital-nomad-visa/', 'https://nipdb.com/', '2026-06-14', 'active'),
  ('Cape Verde', 'Remote Working Cabo Verde', 1640, 'EUR 1,500/month', 40, 'EUR 20-34', '6 months, renewable', 6, true, true, 'Low-fee Atlantic option; short program length keeps planning simpler for many applicants.', array['Valid passport','Remote work proof','Income proof','Health insurance','Accommodation evidence'], '7-14 days', 'https://www.remoteworkingcaboverde.com/', 'https://www.remoteworkingcaboverde.com/', '2026-06-14', 'active'),
  ('Georgia', 'Remotely from Georgia / Long-Stay Remote Work', 2000, 'USD 2,000/month', 0, 'No standard program fee', 'Up to 12 months for many nationals', 12, true, true, 'Individual entrepreneur status can be tax-efficient when structured correctly.', array['Valid passport','Remote work proof','Income proof','Health insurance','Address evidence'], '7-30 days', 'https://www.geoconsul.gov.ge/', 'https://www.geoconsul.gov.ge/', '2026-06-14', 'active')
) as v(country_name, visa_program_name, minimum_income, minimum_income_label, visa_fee, visa_fee_label, duration, duration_months, renewable, dependents_allowed, tax_summary, documents_required, processing_time, application_url, official_government_url, last_verified, status)
join public.countries c on c.country_name = v.country_name
on conflict (country_id, visa_program_name) do update set
  minimum_income = excluded.minimum_income,
  minimum_income_label = excluded.minimum_income_label,
  visa_fee = excluded.visa_fee,
  visa_fee_label = excluded.visa_fee_label,
  duration = excluded.duration,
  duration_months = excluded.duration_months,
  renewable = excluded.renewable,
  dependents_allowed = excluded.dependents_allowed,
  tax_summary = excluded.tax_summary,
  documents_required = excluded.documents_required,
  processing_time = excluded.processing_time,
  application_url = excluded.application_url,
  official_government_url = excluded.official_government_url,
  last_verified = excluded.last_verified,
  status = excluded.status,
  updated_at = now();

insert into public.country_scores (
  country_id, internet_score, cost_of_living_score, safety_score,
  family_friendliness_score, healthcare_score, quality_of_life_score,
  nomad_score, cost_of_living_monthly_usd, internet_speed_mbps
)
select c.id, s.internet_score, s.cost_of_living_score, s.safety_score,
  s.family_friendliness_score, s.healthcare_score, s.quality_of_life_score,
  s.nomad_score, s.cost_of_living_monthly_usd, s.internet_speed_mbps
from (values
  ('Portugal', 88, 76, 88, 90, 82, 90, 94, 2200, 145),
  ('Spain', 90, 74, 84, 91, 86, 91, 92, 2300, 170),
  ('Croatia', 82, 82, 86, 86, 78, 85, 89, 1900, 120),
  ('Estonia', 84, 78, 87, 72, 78, 86, 84, 2100, 140),
  ('Malta', 80, 68, 83, 84, 80, 84, 86, 2600, 125),
  ('Greece', 74, 80, 79, 86, 78, 84, 86, 2000, 95),
  ('Italy', 76, 68, 78, 86, 84, 87, 82, 2600, 115),
  ('Hungary', 86, 84, 76, 58, 73, 80, 80, 1800, 150),
  ('Latvia', 82, 84, 80, 72, 73, 78, 78, 1750, 135),
  ('Romania', 92, 90, 74, 82, 69, 76, 83, 1500, 180),
  ('Czechia', 82, 78, 84, 86, 80, 86, 81, 2100, 130),
  ('Germany', 78, 62, 82, 88, 90, 88, 78, 3000, 120),
  ('Iceland', 92, 46, 94, 85, 88, 89, 73, 4300, 175),
  ('Barbados', 72, 58, 75, 86, 72, 82, 84, 3200, 90),
  ('Antigua and Barbuda', 65, 56, 73, 84, 68, 79, 81, 3400, 70),
  ('Costa Rica', 70, 76, 78, 88, 76, 86, 88, 2200, 85),
  ('Brazil', 76, 90, 55, 82, 68, 76, 84, 1500, 105),
  ('Colombia', 74, 94, 58, 74, 72, 78, 88, 1200, 95),
  ('Ecuador', 66, 92, 60, 82, 68, 75, 80, 1300, 70),
  ('Argentina', 82, 90, 65, 72, 74, 80, 82, 1400, 120),
  ('Uruguay', 88, 72, 79, 86, 78, 84, 83, 2400, 145),
  ('United Arab Emirates', 96, 54, 91, 88, 84, 88, 87, 3600, 220),
  ('Thailand', 88, 90, 73, 88, 80, 84, 93, 1500, 165),
  ('Malaysia', 84, 94, 75, 88, 78, 83, 90, 1300, 140),
  ('Japan', 92, 60, 92, 88, 88, 90, 79, 3200, 190),
  ('South Korea', 96, 66, 86, 88, 88, 87, 80, 2800, 240),
  ('Indonesia', 68, 90, 70, 86, 70, 82, 89, 1400, 85),
  ('Mauritius', 64, 84, 78, 88, 72, 82, 90, 1700, 70),
  ('Seychelles', 58, 68, 77, 82, 66, 79, 78, 2600, 55),
  ('Namibia', 50, 90, 70, 82, 62, 74, 76, 1400, 45),
  ('Cape Verde', 52, 86, 72, 84, 62, 75, 79, 1500, 50),
  ('Georgia', 68, 94, 74, 84, 64, 76, 85, 1200, 85)
) as s(country_name, internet_score, cost_of_living_score, safety_score, family_friendliness_score, healthcare_score, quality_of_life_score, nomad_score, cost_of_living_monthly_usd, internet_speed_mbps)
join public.countries c on c.country_name = s.country_name
on conflict (country_id) do update set
  internet_score = excluded.internet_score,
  cost_of_living_score = excluded.cost_of_living_score,
  safety_score = excluded.safety_score,
  family_friendliness_score = excluded.family_friendliness_score,
  healthcare_score = excluded.healthcare_score,
  quality_of_life_score = excluded.quality_of_life_score,
  nomad_score = excluded.nomad_score,
  cost_of_living_monthly_usd = excluded.cost_of_living_monthly_usd,
  internet_speed_mbps = excluded.internet_speed_mbps,
  updated_at = now();

insert into public.sources (country_id, visa_program_id, source_name, source_url, source_type, confidence_score, last_checked)
select c.id, vp.id, c.country_name || ' official visa information page', vp.application_url, 'official', 85, now()
from public.countries c
join public.visa_programs vp on vp.country_id = c.id
on conflict do nothing;

insert into public.blog_posts (slug, title, excerpt, content, category, status, published_at) values
  ('best-digital-nomad-visas-for-families', 'Best Digital Nomad Visas for Families in 2026', 'A practical shortlist for remote workers moving with spouses, children, and school calendars.', 'Family-friendly digital nomad visas should be compared by dependents, healthcare, schooling, safety, and tax exposure.', 'Family', 'published', now()),
  ('lowest-income-requirement-digital-nomad-visas', 'Lowest Income Requirement Digital Nomad Visas', 'Countries where the income threshold is reachable without sacrificing legal clarity.', 'Low income thresholds can be attractive, but applicants should compare renewal paths and official source confidence.', 'Cost', 'published', now()),
  ('how-to-compare-digital-nomad-visa-tax-rules', 'How to Compare Digital Nomad Visa Tax Rules', 'A plain-English model for comparing days, source, exemptions, and residence triggers.', 'Tax comparisons should include day counts, source rules, exemptions, treaties, and local registration duties.', 'Tax', 'published', now())
on conflict (slug) do update set
  title = excluded.title,
  excerpt = excluded.excerpt,
  content = excluded.content,
  category = excluded.category,
  status = excluded.status,
  updated_at = now();
