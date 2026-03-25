# drift — Round 15: Professional Program, Sleep Medicine Integration, Clinical Tools

## Goal
Bridge consumer sleep tracking with professional sleep medicine — enabling doctors and therapists to prescribe Drift-based sleep programs, and giving users clinical-grade tools when needed.

---

## Scope

### Sleep Program Prescriptions
- **Doctor-prescribed programs**: Doctors can "prescribe" a 4-week sleep program to patients via a unique code
- **CPAP/BiPAP integration**: Pull data from CPAP machines (ResMed, Philips) via HealthKit — track AHI, usage hours
- **Sleep diary integration**: Clinically validated sleep diary (ISI, PSQI) — track subjective sleep quality alongside objective data
- **Insurance coverage**: Work with insurers to potentially cover Drift Pro as a digital therapeutic

### Clinical Reports
- **Doctor-ready PDF report**: Comprehensive sleep history, trends, health correlations — formatted for clinical review
- **Sleep study companion**: If user does an overnight sleep study (polysomnography), Drift can correlate withWatch data
- **Medication tracking**: Log sleep medications (prescription + OTC) — correlate with sleep quality
- **Alert thresholds**: Flag clinically significant events — severe sleep apnea indicators, extremely low sleep efficiency

### Therapist / Coach Dashboard
- **Therapist dashboard**: A web dashboard where sleep coaches can see their clients' sleep data (with consent)
- **Program assignment**: Assign pre-built sleep programs to clients
- **Client messaging**: Send encouragement or adjust program from the dashboard
- **Session prep**: Before a therapy session, generate a summary of client's sleep for the past 2 weeks

### Mental Health Integration
- **Depression screening**: PHQ-9 questionnaire integration — correlate sleep patterns with depression scores
- **Anxiety tracking**: GAD-7 + sleep correlation — does poor sleep predict anxiety spikes?
- **Referral alerts**: If sleep patterns + questionnaire suggest clinical depression/anxiety, prompt user to seek help

---

## Out of Scope
- International expansion (R16)
- Platform expansion (Android, web) (R17)
