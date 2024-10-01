import React, { useState, useContext } from 'react';
import axios from 'axios';
import  StateContext  from '../StateContext'; // Adjust the import according to your project structure

const scholarships = [
    {
        "name": "Government of India Post-Matric Scholarship",
        "eligibility": "1) The parents/Guardian annual income shall be less than or equal to Rs. 2,50,000.2) Student category shall belong to Scheduled caste or Navbouddha3) Student shall belong to resident of Maharashtra 4) Student should be passes SSC/equivalent Matric.  5) Failure: if student fail first time then should avail Exam fees & maintenance allowance. If fails second time in same class then he/she will not get any allowance and after two drops he will pass and go to next class then he will be eligible.6) In case of student studying out of Maharashtra then same rules are applicable as per GOI.7) Only 2 professional Courses are allowed.",
        "links": "https://mahadbt.maharashtra.gov.in//SchemeData/SchemeData?str=E9DDFA703C38E51AA07C7E01997E4885"
    },
    {
        "name": "Post-Matric Tuition Fee and Examination Fee (Freeship)",
        "eligibility": "\u2022 The parents / Guardian annual income above Rs. 250000.to unlimited.\n\u2022 Student category should be Scheduled caste or Neo bouddhist\n\u2022 Student should be resident of Maharashtra\n\u2022 Student should be passes SSC/equivalent Matric.              \n\u2022 Institute should be located in Maharashtra & shall be government recognized.\n\u2022 For Professional Courses student should admit through CAP round only\n\u2022 Only 1 Failure is allowed in whole curriculum.",
        "links": "https://mahadbt.maharashtra.gov.in//SchemeData/SchemeData?str=E9DDFA703C38E51AE3B184954F87E9F7"
    },
    {
        "name": "Maintenance Allowance for student Studying in professional courses",
        "eligibility": "\u2022 Student should be admitted in professional Course.\n\u2022 Students should be the scholarship holder of Government of India  \n\u2022 The limit of income will be applicable as per the Government of India scholarship scheme i.e. annual income limit less than or equal to 2.5 lac\n\u2022 Students who are studying in the professional curriculum and residing in Hostel (Government. or Institutes Hostel or outside).",
        "links": "https://mahadbt.maharashtra.gov.in//SchemeData/SchemeData?str=E9DDFA703C38E51AB210B3E0B1AA642F"
    },
    {
        "name": "Rajarshri Chhatrapati Shahu Maharaj Merit Scholarship",
        "eligibility": "\u2022 Student should belong to SC.\n\u2022 There is no income limit for the Scholarship. \n\u2022 Students must be Studying in 11th or 12th. \n\u2022 Students should secure 75% and above in 10th.\n\u2022 Student should be resident of Maharashtra",
        "links": "https://mahadbt.maharashtra.gov.in//SchemeData/SchemeData?str=E9DDFA703C38E51A3160277BCF2AA7C6"
    },
    {
        "name": "Post-Matric Scholarship for persons with disability",
        "eligibility": "\u2022 Student should be disable. (40% or above) \n\u2022 Student should be residential of Maharashtra. \n\u2022 Student should be Studying in recognized University or Recognized institute. \n\u2022 The scholarship will not be applicable if the candidate fails or quit the same course in the applied course (incomplete course). \n\u2022 The Scholarship will not be applicable twice or second time if the candidate applies on the criteria of HSC/SSC/Degree. (application should be in progressive format)(only once course is allowed)  \n\u2022 Student studying in recognized institute or college out of Maharashtra but he should be residential of MH. \n\u2022 If student is in Post-Graduation from medical education field and he is not allow to do practice out of institute then he is eligible. For ex: internship or houseman ship where stipend is getting. \n\u2022 if student  arts, science & Commerce student discontinues his course & applies from professional course, technical education certificate/diploma/degree is applicable for the scholarship. But except group \u201cA\u201d the candidate fails the scholarship will not be applicable for the scholarship. \n\u2022 For Group B, C, D, and E:  If the student fails then he will not be eligible for this scheme. \n\u2022 For Group A: If the student fails 1 time, he may be eligible for this scheme, but he will not be eligible if he fails Second time during the full time of education.  \n\u2022 The candidate who taking distance education from recognized uni/Institution where non-refundable fees has to be paid by the student such students are getting annual Rs. 500/- for books and material purchase.  \n\u2022 Candidate only can apply Shahu Maharaj Merit Schol with this Scheme. cant apply for another scheme. \n\u2022 If candidate is working full time employment then he/she is not eligible. \n\u2022 If candidate is from Gov hosteller & he is not getting books and stationery from hostel then he is eligible for additional 1/3 amount of maintenance allowance allowed for hosteller. \n\u2022 The candidate residing in college/institute or any other recognized hostel & if he/she pays hostel fees (application point no 11) then the candidates maintenance allowance will be given of hosteller rates.",
        "links": "https://mahadbt.maharashtra.gov.in//SchemeData/SchemeData?str=E9DDFA703C38E51A054A8D0DAA702B64"
    },
    
    {
        "name": "Post Matric Scholarship Scheme (Government Of India )",
        "eligibility": "Applicable for ST only * If Family Income <= 2,50,000, he will get the scholarship * Minimum 10th Pass * Back to back drop for 2 years he/she will not be allowed to fill form.",
        "links": "https://mahadbt.maharashtra.gov.in//SchemeData/SchemeData?str=E9DDFA703C38E51A739268F02CEC37EC"
    },
    {
        "name": "Tuition Fee &\u00a0 Exam Fee for Tribal Students ( Freeship)",
        "eligibility": "Applicable for ST only * Family annual income limit is RS. > 2,50,000  Renewal Policy : The student have to pass the previous year examination* If student fails in any year then he is not paid the scholarship for that particular year",
        "links": "https://mahadbt.maharashtra.gov.in//SchemeData/SchemeData?str=E9DDFA703C38E51AFC085DBE43E82570"
    },
    
    {
        "name": "Vocational Education Maintenance Allowance",
        "eligibility": "Applicable for ST caste only.* If Family Income <= 2,50,000, he will get the scholarship. If income is >2,50,000 then he will get a freeship  Renewal Policy : The student have to pass the previous year examination* If student fails in any year then he is not paid the scholarship for that particular year",
        "links": "https://mahadbt.maharashtra.gov.in//SchemeData/SchemeData?str=E9DDFA703C38E51AADA109F73D48B5D5"
    },
    {
        "name": "Vocational Training Fee reimbursement for the students belonging to Scheduled Tribe Category",
        "eligibility": "1. Student should belong to ST Category and also provide Caste Validity Certificate. 2. Original Leaving Certificate / Transfer Certificate is Mandatory. 3. Scheme applicable for SSC Pass and SSC Fail. 4. Admission taken through PPP scheme in Government Skill Development Institute or Private Institute and admitted through central Online Admission Process. 5. No Fee reimbursement for Management Quota Admission. 6. Overall Family Income will be considered (Father + Mother Income) 7. Candidate should not have taken any benefit for course previously from Government or Private ITI. 8. Candidate should not have taken any benefit for training program sponsored by State / Central Government / Department / Local Body / Company or Corporation. 9. Domicile of Maharashtra 10. Admission taken for DGT, New Delhi or MSCVT approved courses 11. Benefit applicable to only 2 children. 12. Attendance criteria is mandatory.  13. Candidate need to attend each semester /annual exam. If not after recommendation by Student and Institute, Project Officer integrated Tribal Development Project should certify or recommend.  14. Non Satisfactory educational progress due to misconduct- Failure in academic year, not fulfilling attendance criteria if found then candidate will not be eligible for reimbursement.",
        "links": "https://mahadbt.maharashtra.gov.in//SchemeData/SchemeData?str=E9DDFA703C38E51A649D149EAF5F4A10"
    },
    {
        "name": "Rajarshi Chhatrapati Shahu Maharaj Shikshan Shulkh Shishyavrutti Scheme",
        "eligibility": "( As Per GR Dated 7.10.2017 , 31.3.2018 & 07.08.2018, 11.07.2019 )\n\nApplicant should be Domicile of Maharashtra and applicant belongs to Maharashtra State and Karnataka state border can apply for scheme.\nFamily annual income limit is  upto Rs. 8.00 lakh.\nAs per Government Resolution first two children are eligible for scheme. \nCandidate those who take admission under general category is eligible.\nCourses from GR 07/10/17 (DHE courses) can apply. \nCandidates are eligible those who have taken an admission under general category and SEBC Category. \nCourses by GR 07/10/17 (DHE courses) can apply.\nApplicant should not avail any other scholarship or stipend. \nStudents are not eligible who has taken an admission in Distance Education, virtual learning and part time courses.\nThe Courses approved by (Government /University/AICTE,PCI/COA/MCI/NCTE/ etc )  are eligible.\nDuring course, candidate should not have a gap of 2 years.  \nApplicant should attempt every semester or annual exam.",
        "links": "https://mahadbt.maharashtra.gov.in//SchemeData/SchemeData?str=E9DDFA703C38E51A2D3C3A162F4DE21D"
    },
    {
        "name": "Assistance to Meritorious Students scholarship - Junior Level",
        "eligibility": "1) AMS Scholarship (Junior Level) ( As Per GR Dated 17.05.1984 )   The students from 11 & 12th class are eligible who gets top rank in secondary and higher secondary examinations.   For Renewal:- Junior level student must possess 55% marks should have admission to next class.   DHE sanctioned letter  Maharashtrian Students studying Out of Maharashtra can apply for this scheme. 2) AMS Scholarship (Senior Level) (As Per GR Dated 17.05.1984)    The students after 12th are eligible who gets top rank in secondary and higher secondary examinations.   For Renewal:- Senior level students must possess 65% marks and should have admission to next class.   DHE sanctioned letter.   Maharashtrian Students studying Out of Maharashtra can apply for this scheme.",
        "links": "https://mahadbt.maharashtra.gov.in//SchemeData/SchemeData?str=E9DDFA703C38E51A974A58E65FA75F28"
    },
    {
        "name": "Education Concession to the Children of Ex-Servicemen",
        "eligibility": "( As Per GR Dated 14.01.1985)   Students should be Son/Daughter/Wife/Widow of an EX-SERVICEMAN  Only government and aided college.  Maharashtrian Students studying Out of Maharashtra cannot apply for this scheme.",
        "links": "https://mahadbt.maharashtra.gov.in//SchemeData/SchemeData?str=E9DDFA703C38E51ADB0E651ACBFBD0AB"
    },
    {
        "name": "Eklavya Scholarship",
        "eligibility": "(As Per GR Dated 7.02.1996) & GR Dated 5.02.2004)   Students must graduate from Law, Commerce & Arts having 60% marks and for Science students must have 70%.  Annual income of the applicant's parents should be less than/equal to Rs. 75,000/- limit. The applicant must be a resident of Maharashtra State.  The beneficiary should not do a part-time or full-time job anywhere. Maharashtrian Students studying Out of Maharashtra cannot apply for this scheme.",
        "links": "https://mahadbt.maharashtra.gov.in//SchemeData/SchemeData?str=E9DDFA703C38E51AB0BE07C3EC756406"
    },
    {
        "name": "State Government Open Merit Scholarship",
        "eligibility": "The applicant must be a resident of the Maharashtra State. Need to get at least 60 percent in 12th standard.  Only applicable for stream Arts, commerce, science and law.  Maharashtrian Students studying Out of Maharashtra cannot apply for this scheme.",
        "links": "https://mahadbt.maharashtra.gov.in//SchemeData/SchemeData?str=E9DDFA703C38E51AC3C0DE50B5557546"
    },
    {
        "name": "Scholarship to Meritorious students possessing Mathematics /Physics",
        "eligibility": "( As Per GR Dated 07.10.1985)  Need to get in 12th std with atleast 60% in science exam and more than 60% in Maths & Physics. Maharashtrian Students studying Out of Maharashtra cannot apply for this scheme.  The applicant must be a resident of the Maharashtra State.",
        "links": "https://mahadbt.maharashtra.gov.in//SchemeData/SchemeData?str=E9DDFA703C38E51A4BBDC0D4DC8452FB"
    },
    {
        "name": "Government Vidyaniketan Scholarship",
        "eligibility": "( As Per GR Dated 02.09.1986)     Need to get 60% marks in 10th standard.  Need to passed by 10th standard exam from The State Government Vidyanikethan only. Maharashtrian Students studying Out of Maharashtra cannot apply for this scheme. The applicant must be a resident of the Maharashtra State.",
        "links": "https://mahadbt.maharashtra.gov.in//SchemeData/SchemeData?str=E9DDFA703C38E51AEC62CC61F6C26609"
    },
    {
        "name": "State Government Daxshina Adhichatra Scholarship",
        "eligibility": "( As Per GR Dated 29.9.1965).  Applicant Must  be a Graduate.  (Non Agricultural Universities)   only government colleges a)elphinstone college,Bombay(6) b)institue of science,Bombay(6) c) Ismaail yusuf college,jogeshwari (4) d)Sydenham college of commerce(4) e) Govt. Law college,Bombay (4) f)Rajaram college, kolhapur (6)    g) college of science,nagpur(6)   h)nagpur mahavidyalaya,nagpur(6)   i) vidarbha mahavidyalaya amravati(6),  j) govt arts and science college,aurangabad(6)    and  Mumbai university(4),Pune university(4),Nagpur university(4),Kolhapur(4),SNDT(2), Maharashtrian Students studying Out of Maharashtra cannot apply for this scheme The applicant must be a resident of the Maharashtra State",
        "links": "https://mahadbt.maharashtra.gov.in//SchemeData/SchemeData?str=E9DDFA703C38E51A0D2D93F9CF99BD37"
    },
    {
        "name": "Government Research Adhichatra",
        "eligibility": "( As Per GR Dated 13.08.1985)   Applicant must be post graduate The applicant must be a resident of the Maharashtra State  Applicant should have 60% marks in post graduation. B.A/BSC/B.ED AND M.A/MSC/M.ED AND for any other degree below 60% marks is applicable Only govt science institute(Mumbai-3,Nagpur-3,Aurangabad-3),and govt vidarbh gyan vidnyan science institute(Amravati-1), vasantrao naik mahavidyalay college(Nagpur-1),universities and affilated colleges.(3)  ---Brackets indicates quota Maharashtrian Students studying Out of Maharashtra cannot apply for this scheme",
        "links": "https://mahadbt.maharashtra.gov.in//SchemeData/SchemeData?str=E9DDFA703C38E51AA7F7B18C7EA3C817"
    },
    {
        "name": "Education Concession to the Children Freedom Fighter",
        "eligibility": "(As Per GR Dated 23.11.1965 & GR Dated 31.12.1990)   Students should be Son/Daughter/Wife/Widow of freedom fighter Maharashtrian Students studying Out of Maharashtra cannot apply for this scheme Domicile of Maharashtra.",
        "links": "https://mahadbt.maharashtra.gov.in//SchemeData/SchemeData?str=E9DDFA703C38E51A9A3C313414F8286F"
    },
    {
        "name": "Jawaharlal Nehru University Scholarship",
        "eligibility": "( As Per GR Dated 07.05.1983)  Maharashtrian students who studied in JNU. Quota is only for 1 decided by JNU UG and PG (JNU Students) are applicable for that scheme Domicile of Maharashtra.",
        "links": "https://mahadbt.maharashtra.gov.in//SchemeData/SchemeData?str=E9DDFA703C38E51ABF4E10E281A07733"
    },
    {
        "name": "Assistance to Meritorious Students scholarship - Senior Level",
        "eligibility": "1) AMS Scholarship (Junior Level) ( As Per GR Dated 17.05.1984 )   The students from 11 & 12th class are eligible who gets top rank in secondary and higher secondary examinations.   For Renewal:- Junior level student must possess 55% marks should have admission to next class.   DHE sanctioned letter  Maharashtrian Students studying Out of Maharashtra can apply for this scheme. 2) AMS Scholarship (Senior Level) (As Per GR Dated 17.05.1984)    The students after 12th are eligible who gets top rank in secondary and higher secondary examinations.   For Renewal:- Senior level students must possess 65% marks and should have admission to next class.   DHE sanctioned letter.   Maharashtrian Students studying Out of Maharashtra can apply for this scheme.",
        "links": "https://mahadbt.maharashtra.gov.in//SchemeData/SchemeData?str=E9DDFA703C38E51A581B0F1DB8A46333"
    },
    {
        "name": "Dr. Punjabrao Deshmukh Vasatigruh Nirvah Bhatta Yojna (DHE)",
        "eligibility": "(As Per GR Dated 7.10.2017 , 22.02.2018 , 11.07.2019)\n\nApplicant should be Domicile of Maharashtra. \nFor professional courses, Applicant should be a child of registered labor , child of Alpabhudarak or both as total annual income of family/ Guardian should not be more than 8.lakh.\nFor Non Professional Courses, applicant should have upto 1 lakh family Annual Income.\nApplicant should submit Family Annual Income Certificate.\nAs per Government Resolution first two children eligible for scheme. \nCandidates are eligible those who have taken an admission under general category and SEBC Category. \nCourses by GR 07/10/17 (DHE courses) can apply.\nApplicant should be hosteller.(Govt/Private hostel/ Paying Guest/ Tenant.)\nApplicant should not avail any other Nirvah Bhatta benefit.\nCourses approved by (Govt/AICTE,PCI/COA/MCI/NCTE/University etc ) are eligible.\nDuring course, candidate should not have a gap of 2 years. \nApplicant should attempt every semester or annual exam.",
        "links": "https://mahadbt.maharashtra.gov.in//SchemeData/SchemeData?str=E9DDFA703C38E51AD7C4C238FF7FAB33"
    },
    {
        "name": "Rajarshi Chhatrapati Shahu Maharaj Shikshan Shulkh Shishyavrutti Yojna(EBC)",
        "eligibility": "(As per the GR Dated 07th Oct 2017, 01st March 2018, 31st March 2018, 11th July 2019, 08 July 2024)\na) Applicant should have Nationality of India.b) Candidate should be Domicile of Maharashtra State.c) Applicant should be \u201dBonafide Student of Institute\u201d and admitted for Professional and Technical course (Diploma / Graduation / Post Graduation Degree) as mentioned in GR.d) Deemed University and Private university is not applicable.e) Candidate should be admitted through Centralized Admission Process (CAP).f) Applicant should not avail any other scholarship/stipend.g) For current Academic Year, Only 2 child from family are allowed for benefit of scheme.h) The Total Annual Income of Family / Guardian should not be more than 8 Lakhs.i) Minimum 50 % attendance in previous semester (Exception for first semester fresh admitted Student ).j) During course duration, candidate should not have a gap of 2 or more than 2 years.",
        "links": "https://mahadbt.maharashtra.gov.in//SchemeData/SchemeData?str=E9DDFA703C38E51AA54D7A32E4C3B30A"
    },
    {
        "name": "Dr Panjabrao Deshmukh Vastigruh Nirvah Bhatta Yojna(DTE)",
        "eligibility": "(As per the GR Dated 07th Oct 2017, 22nd Feb 2018, 01st March 2018, 18th June 2018, 11th July 2019)\n        a) Applicant should have Nationality of India.        b) Candidate should be Domicile of Maharashtra State.        c) Applicant should be \"Bonafide Student of Institute\" and admitted for Professional and Technical courses (Diploma / Graduation / Post Graduation Degree) as mentioned in GR.        d) Deemed University and Private university are not applicable.        e) Candidate should be admitted through Centralized Admission Process (CAP).        f) Applicant should not avail any other scholarship/stipend.        g) For current Academic Year, only 2 children from the family are allowed for the benefit of the scheme.        h) The Total Annual Income of Family / Guardian should not be more than 8 Lakhs.        i) Minimum 50% attendance in the previous semester (Exception for freshly admitted students in College).        j) During the course duration, the candidate should not have a gap of 2 or more years.        k) Candidates are eligible if they have taken admission under the General category and SEBC Category.",
        "links": "https://mahadbt.maharashtra.gov.in//SchemeData/SchemeData?str=E9DDFA703C38E51A1DB822FC15D61FEA"
    },
    {
        "name": "Open Merit Scholarships in Junior College",
        "eligibility": "Applicant must be studying in Class 11 or 12.  \n Applicant must have secured a minimum of 60 percent marks in the SSC examination in First Attempt. \n The continuance of scholarships is subject to satisfactory progress and securing at least 50 % marks at the end of the first year of Junior CollegeBeneficary Category - All Categories",
        "links": "https://mahadbt.maharashtra.gov.in//SchemeData/SchemeData?str=E9DDFA703C38E51AAC90D4A992C45BAB"
    },
    {
        "name": "Merit Scholarships for Economically Backward Class Students",
        "eligibility": "Applicant must secure a minimum of 50 % marks in SSC examination.    \n Students who cleared examination in first attempt.",
        "links": "https://mahadbt.maharashtra.gov.in//SchemeData/SchemeData?str=E9DDFA703C38E51AB6EDCD4985FE7C3A"
    },
    {
        "name": "Post Matric Scholarship to VJNT Students",
        "eligibility": "1) The parents/Guardians annual Income should be less than or equal to Rs.1.50 Lac.   2) Applicant should be belongs to VJNT category.                                                          3) Applicants must be residents of Maharashtra.                                                       4) Applicants must be pursuing the education course approved by the government from class Post-Matric.                                                              5) Maintenance allowance & Exam Fees are paid to Applicant if Applicant get promoted to next higher class.   6) If Applicant fails in particular year then he will get the Tuition Fees, Exam Fees and Maintenance allowance of that particular academic year but he/she will not get the benefit until he/she gets promoted to next higher class.7) Applicant should be come through CAP round for only professional courses.     8) Only two children (i) any number of girls applicants allowed. ii) boys applicants maximum 2 of the same parent) of the same parents will be eligible for the Scholarship. 9) No scholarship will be paid to the Applicants under this scheme from the date he /she accepts another Scholarship / stipend.10) 75 % attendance is mandatory for current year.11) Applicant will be eligible for scholarship if he / she changes the course Non \u2013 Professional to Professional but he will not be eligible if he / she changes the course from Professional to Non \u2013 Professional.12) Scholarships/freeship  will continue until Applicant completes one course. Ex. - 11th, 12th Arts - B.A., M.A. , M.Phil., P.H.D. If,  Applicant completed B.A and B.Ed. course and later after taking admission for M.A., for M.A. course He/she  will not be allowed for scholarship/freeship. But after admission to M.B.A. after B.Ed, it can be eligible for scholarship/freeship as it is a professional post graduate course.13) Applicant studying in particular professional/Non-Professional course, and availing benefits of scholarship/freeship for that academic course and if he/she wants to change his existing Professional/Non-Professional course in between academic years he/she will not be eligible for freeship/scholarship for further course.",
        "links": "https://mahadbt.maharashtra.gov.in//SchemeData/SchemeData?str=E9DDFA703C38E51AD0CCA04E9F6D7EE4"
    },
    {
        "name": "Tuition Fees and Examination Fees to VJNT Students",
        "eligibility": "1) Applicant must be taking post matric education.2) Applicant should be belongs to VJNT category.3) Parent\u2019s annual income should be less than or equal to 8.00 Lacs.                      4) Applicants must be residents of Maharashtra.                                                     5) Applicants should be pursuing the education course approved by the government for Post Matric courses.                                                  6) Applicant must be taken admission in government government aided / Private Non-Aided / private permanently non aided for  professional courses 7) Degree Courses in Health Science(Medical, Dental, Homeopathy, Unani, Ayurveda, Physiotherapy, Business Aid, Nursing) :If Applicant is admitted through Association of Managements of Unaided Private Medical and Dental Colleges entrance examination or admitted through government common entrance examination then he/she will be eligible the for the freeship.8) Higher and Technical Education Department :Freeship will be applicable to unaided colleges / government and aided colleges with technical education / Polytechnic and government unaided professional courses. Following are the applicable courses for this scheme :\u2022 Diploma \u2013 Engineering, Pharmacology, HMCT\u2022 Degree \u2013 Engineering, Pharmacology, HMCT\u2022 Post Graduate \u2013MBA/MMS, MCA9) Agriculture, Animal Husbandry and Dairy Development and Fisheries Department :The scholarship fees will be applicable to the Applicants who have been admitted through government quota in private un aided/permanently un aided institute. \u2022 Agricultural colleges (diploma)\u2022 Dairy Business Department (Diploma)\u2022 Colleges for Agricultural and Allied subjects (Degree and Post Graduate)\u2022 Agriculture and Bio-Technology Colleges (Degree and Post Graduate)\u2022 Agriculture and Food Technology Colleges (Graduate and Post Graduate)10) For B.Ed and D.Ed courses :  100 % benefit (Tuition Fees, Exam Fees) is applicable for D.Ed, B.Ed courses. For students studying in Aided, UnAided for D.Ed, B.Ed courses then Fee structure is applicable as per Government rates for same course.11) For professional courses Applicant should admitted through CAP round is must. 12) If Applicant fails in particular year then he will get the Tuition Fees and Exam Fees of that particular academic year but he/she will not get the benefit until he/she gets promoted to next higher class..   13) Applicant will be eligible for scholarship if he / she change the course Non \u2013 Professional to Professional but he will not be eligible if he / she change the course from Professional to Non \u2013 Professional.14) If an applicant pursuing professional course admitted in private un aided/permanently un aided institute for year 2015-16 onwards fails in the examination two or more times in particular academic course duration then he / she not eligible for the freeship.15) Scholarships/freeship  will continue until Applicant completes one course. Ex. - 11th, 12th Arts - B.A., M.A. , M.Phil., P.H.D. If,  Applicant completed B.A and B.Ed. course and later after taking admission for M.A., for M.A. course He/she  will not be allowed for scholarship/freeship. But after admission to M.B.A. after B.Ed, it can be eligible for scholarship/freeship as it is a professional postgraduate course.16) Applicant studying in particular professional/Non-Professional course, and availing benefits of scholarship/freeship for that academic course and if he/she wants to change his existing Professional/Non-Professional course in between academic years he/she will not be eligible for freeship/scholarship for further course.",
        "links": "https://mahadbt.maharashtra.gov.in//SchemeData/SchemeData?str=E9DDFA703C38E51AF84D5DECD4CA9AB5"
    },
    {
        "name": "Payment of Maintenance Allowance to VJNT and SBC Students Studying in Professional Courses and Living in Hostel Attached to Professional Colleges",
        "eligibility": "1) Applicant should be studying in professional course Engineering, Medical, Veterinary, Architecture, and Agriculture. 2) Applicant must be belongs to VJNT and SBC category.3) Applicant should be eligible for Post Matric Scholarship. 4) Applicants parents annual income should be less than or equal to Rs. 1 Lac. 5) Applicant should submit Application form for admission in Govt. Hostel.6) Applicant is not eligible for maintenance allowance if Applicant takes admission in government hostel.7) Applicant should have admitted in the hostels attached to Professional Colleges or should produce the certificate of non-availability of the rooms. 8) Applicant who is residing outside the hostel, should submit Certificate that he had applied for Govt. hostel and College hostel but he could not get admission even though he is eligible for admission. 9) If Applicant fails in particular year then he will get the maintenance allowance of that particular academic year but he/she will not get the benefit until he/she gets promoted to next higher class.   10) Applicant will be eligible for scholarship if he / she changes the course Non \u2013 Professional to Professional but he will not be eligible if he / she changes the course from Professional to Non \u2013 Professional.11) Scholarships/freeship  will continue until Applicant completes one course. Ex. - 11th, 12th Arts - B.A., M.A. , M.Phil., P.H.D. If,  Applicant completed B.A and B.Ed. course and later after taking admission for M.A., for M.A. course He/she  will not be allowed for scholarship/freeship. But after admission to M.B.A. after B.Ed, it can be eligible for scholarship/freeship as it is a professional postgraduate course.",
        "links": "https://mahadbt.maharashtra.gov.in//SchemeData/SchemeData?str=E9DDFA703C38E51A66AC4BAB6E4DB665"
    },
    {
        "name": "Rajarshi  Chhatrapati  Shahu  Maharaj Merit Scholarship for students studying in 11th & 12th standard of VJNT & SBC category",
        "eligibility": "1) Applicants should belong to Vimukta Jatis, Nomadic Tribes or Special Backward Class.2) Applicant must be studying in 11th and 12th standard in Jr. College.3) There will be no income limit for this Scholarship.4) Applicant should have to secure 75% and above marks in 10th standard Examination.5) Scholarship benefit can be taken in addition to Post Matric Scholarship. 6) Education gap is not allowed for this scholarship.7) Applicant must be residents of Maharashtra.",
        "links": "https://mahadbt.maharashtra.gov.in//SchemeData/SchemeData?str=E9DDFA703C38E51AAB0ACBF92AD2F649"
    },
    {
        "name": "Post Matric Scholarship to OBC Students",
        "eligibility": "1) The parents/Guardians annual Income should be less than or equal to Rs.1.50 Lac. 2) Applicant should be belongs to OBC category.                  3) Applicants must be residents of Maharashtra.       4) Applicants must be pursuing the education course approved by the government from class Post-Matric.     5) If Applicant fails in particular year then he will get the Tuition Fees, Exam Fees and Maintenance allowance of that particular academic year but he/she will not get the benefit until he/she gets promoted to next higher class.6) Applicant should be come through CAP round for only professional courses.     7) Only two children (i)any number of girls applicants allowed. ii) boys applicants maximum 2 of the same parents will be eligible for the Scholarship. 8) No scholarship will be paid to the Applicants under this scheme from the date he /she accepts another Scholarship / stipend.9) 75 % attendance is mandatory for current year.10) Applicant will be eligible for scholarship if he / she changes the course Non \u2013 Professional to Professional but he will not be eligible if he / she changes the course from Professional to Non \u2013 Professional.11) Scholarships/freeship  will continue until Applicant completes one course. Ex. - 11th, 12th Arts - B.A., M.A. , M.Phil., P.H.D. If,  Applicant completed B.A and B.Ed. course and later after taking admission for M.A., for M.A. course He/she  will not be allowed for scholarship/freeship. But after admission to M.B.A. after B.Ed, it can be eligible for scholarship/freeship as it is a professional postgraduate course.12) Applicant studying in particular professional/Non-Professional course, and availing benefits of scholarship/freeship for that academic course and if he/she wants to change his existing Professional/Non-Professional course in between academic years he/she will not be eligible for freeship/scholarship for further course.",
        "links": "https://mahadbt.maharashtra.gov.in//SchemeData/SchemeData?str=E9DDFA703C38E51AC54E5F6E794BD5C1"
    },
    {
        "name": "Post Matric Scholarship to SBC Students",
        "eligibility": "1) The parents/Guardians annual Income should be less than or equal to Rs.1.50 Lac.  2) Applicants must be belongs to SBC category.                                                               3) Applicants should be residents of Maharashtra.                                                      4) Applicants must be pursuing the education course approved by the government from class Post-Matric.                                                             5) If Applicant fails in particular year then he will get the Tuition Fees, Exam Fees and Maintenance allowance of that particular academic year but he/she will not get the benefit until he/she gets promoted to next higher class.   6) Applicant should be come through CAP round for only professional courses.     7) Only two children (i)any number of girls applicants allowed. ii) boys applicants maximum 2 of the same parent will be eligible for the Scholarship. 8) No scholarship will be paid to the Applicants under this scheme from the date he /she accepts another Scholarship / stipend.9) 75 % attendance is mandatory for current year.10) Applicant will be eligible for scholarship if he / she changes the course Non \u2013 Professional to Professional but he will not be eligible if he / she changes the course from Professional to Non \u2013 Professional.11) Scholarships/freeship  will continue until Applicant completes one course. Ex. - 11th, 12th Arts - B.A., M.A. , M.Phil., P.H.D. If,  Applicant completed B.A and B.Ed. course and later after taking admission for M.A., for M.A. course He/she  will not be allowed for scholarship/freeship. But after admission to M.B.A. after B.Ed, it can be eligible for scholarship/freeship as it is a professional postgraduate course.12) Applicant studying in particular professional/Non-Professional course, and availing benefits of scholarship/freeship for that academic course and if he/she wants to change his existing Professional/Non-Professional course in between academic years he/she will not be eligible for freeship/scholarship for further course.",
        "links": "https://mahadbt.maharashtra.gov.in//SchemeData/SchemeData?str=E9DDFA703C38E51AACF2205FD2FB060A"
    },
    {
        "name": "Tuition Fees and Examination Fees to OBC Students",
        "eligibility": "1) Applicant must be taking post matric education.2) Parent\u2019s annual income should be less than or equal to 8.00 Lacs.3) Applicant should be belongs to OBC category.                                                             4) Applicants must be pursuing the education course approved by the government from Post - Matric course                                5) Applicants must be residents of Maharashtra.                                                            6) Applicant must be taken admission in government government aided / Private Non-Aided / Private permanently non aided courses.7) Degree Courses in Health Science(Medical, Dental, Homeopathy, Unani, Ayurveda, Physiotherapy, Business Aid, Nursing) :If Applicant is admitted through Association of Managements of Unaided Private Medical and Dental Colleges entrance examination or admitted through government common entrance examination then he/she will be eligible the for the freeship.8) Higher and Technical Education Department :Freeship will be applicable to unaided colleges / government and aided colleges with technical education / Polytechnic and government unaided professional courses. Following are the applicable courses for this scheme :\u2022 Diploma \u2013 Engineering, Pharmacology, HMCT\u2022 Degree \u2013 Engineering, Pharmacology, HMCT\u2022 Post Graduate \u2013MBA/MMS, MCA9) Agriculture, Animal Husbandry and Dairy Development and Fisheries Department :The scholarship fees will be applicable to the Applicants who have been admitted through government quota in private un aided/permanently un aided institute. \u2022 Agricultural colleges (diploma)\u2022 Dairy Business Department (Diploma)\u2022 Colleges for Agricultural and Allied subjects (Degree and Post Graduate)\u2022 Agriculture and Bio-Technology Colleges (Degree and Post Graduate)\u2022 Agriculture and Food Technology Colleges (Graduate and Post Graduate)10)For B.Ed and D.Ed courses :  100 % benefit (Tuition Fees, Exam Fees) is applicable for D.Ed, B.Ed courses. For students studying in Aided, UnAided for D.Ed, B.Ed courses then Fee structure is applicable as per Government rates for same course.11) For professional courses Applicant should admitted through CAP round is must.12) If Applicant fails in particular year then he will get the Tuition Fees and Exam Fees of that particular academic year but he/she will not get the benefit until he/she gets promoted to next higher class.13) Applicant will be eligible for scholarship if he / she changes the course Non \u2013 Professional to Professional but he will not be eligible if he / she changes the course from Professional to Non \u2013 Professional.14) If an applicant pursuing professional course admitted in private un aided/permanently un aided institute for year 2015-16 onwards fails in the examination two or more times in particular academic course duration then he / she not eligible for the freeship.15) Applicant studying in particular professional/Non-Professional course, and availing benefits of scholarship/freeship for that academic course and if he/she wants to change his existing Professional/Non-Professional course in between academic years he/she will not be eligible for freeship/scholarship for further course.16) Scholarships/freeship  will continue until Applicant completes one course. Ex. - 11th, 12th Arts - B.A., M.A. , M.Phil., P.H.D. If,  Applicant completed B.A and B.Ed. course and later after taking admission for M.A., for M.A. course He/she  will not be allowed for scholarship/freeship. But after admission to M.B.A. after B.Ed, it can be eligible for scholarship/freeship as it is a professional postgraduate course.",
        "links": "https://mahadbt.maharashtra.gov.in//SchemeData/SchemeData?str=E9DDFA703C38E51A8311355D6F13BE56"
    },
    {
        "name": "Tuition Fees and Examination Fees to SBC Students",
        "eligibility": "1) Applicant must be taking post matric education.2) Parent\u2019s annual income should be less than or equal to 8.00 Lacs.3) Applicant should be belongs to SBC Category.                             4) Applicants must be residents of Maharashtra.                                                     5) Applicants must be pursuing the education course approved by the government for Post Matric courses.                                                  6) Applicant should be taken admission in government government aided / Private Non-Aided / private permanently non aided courses. 7) Degree Courses in Health Science(Medical, Dental, Homeopathy, Unani, Ayurveda, Physiotherapy, Business Aid, Nursing) :If Applicant is admitted through Association of Managements of Unaided Private Medical and Dental Colleges entrance examination or admitted through government common entrance examination then he/she will be eligible the for the freeship.8) Higher and Technical Education Department :Freeship will be applicable to unaided colleges / government and aided colleges with technical education / Polytechnic and government unaided professional courses. Following are the applicable courses for this scheme :\u2022 Diploma \u2013 Engineering, Pharmacology, HMCT\u2022 Degree \u2013 Engineering, Pharmacology, HMCT\u2022 Post Graduate \u2013MBA/MMS, MCA9) Agriculture, Animal Husbandry and Dairy Development and Fisheries Department :The scholarship fees will be applicable to the Applicants who have been admitted through government quota in private un aided/permanently un aided institute. \u2022 Agricultural colleges (diploma)\u2022 Dairy Business Department (Diploma)\u2022 Colleges for Agricultural and Allied subjects (Degree and Post Graduate)\u2022 Agriculture and Bio-Technology Colleges (Degree and Post Graduate)\u2022 Agriculture and Food Technology Colleges (Graduate and Post Graduate)10) For B.Ed and D.Ed courses :  100 % benefit (Tuition Fees, Exam Fees) is applicable for D.Ed, B.Ed courses. For students studying in Aided, UnAided for D.Ed, B.Ed courses then Fee structure is applicable as per Government rates for same course.11) For professional courses Applicant should admitted through CAP round is must. 12) If Applicant fails in particular year then he will get the Tuition Fees and Exam Fees of that particular academic year but he/she will not get the benefit until he/she gets promoted to next higher class.   13) Applicant will be eligible for scholarship if he / she changes the course Non \u2013 Professional to Professional but he will not be eligible if he / she changes the course from Professional to Non \u2013 Professional.14) If an applicant pursuing professional course admitted for year 2015-16 onwards fails in the examination two or more times in particular academic course duration then he / she not eligible for the freeship.15) Scholarships/freeship  will continue until Applicant completes one course. Ex. - 11th, 12th Arts - B.A., M.A. , M.Phil., P.H.D. If,  Applicant completed B.A and B.Ed. course and later after taking admission for M.A., for M.A. course He/she  will not be allowed for scholarship/freeship. But after admission to M.B.A. after B.Ed, it can be eligible for scholarship/freeship as it is a professional postgraduate course.",
        "links": "https://mahadbt.maharashtra.gov.in//SchemeData/SchemeData?str=E9DDFA703C38E51A2406A5294F822FAC"
    },
    {
        "name": "Vocational Training Fee reimbursement for the OBC, SEBC, VJNT & SBC Welfare Department students",
        "eligibility": "1.Admission taken through PPP scheme in Government Skill Development Institute or Private Institute and admitted through central Online Admission Process.  2.No Fee reimbursement for Management Quota Admission   3.Student should belong to OBC, SEBC, VJNT & SBC Category and should provide caste certificate.  4.Overall Family Income should be Rs.8.00 lacs. Non Cremy layer certificate is required.  5.Orphan candidate requires Recommendation Letter.  6.Candidate should not have taken any benefit for course previously from Government or Private ITI.  7.Candidate should not have taken any benefit for training program sponsored by State / Central Government / Department / Local Body / Company or Corporation.  8.Domicile of Maharashtra.  9.Admission taken for DGT, New Delhi or MSCVT approved courses.  10.Benefit applicable to only 2 children   11.Attendance criteria is mandatory.  12.Candidate need to attend each semester /annual exam. If any medical emergency then after    recommendation by institute Regional Joint Director should certify or recommend.  13.Non Satisfactory educational progress due to misconduct- Failure in academic year, not fulfilling attendance criteria if found then candidate will not be eligible for reimbursement.",
        "links": "https://mahadbt.maharashtra.gov.in//SchemeData/SchemeData?str=E9DDFA703C38E51AFFD85CFC9534EEE5"
    },
    {
        "name": "Rajarshri Chhatrapati Shahu Maharaj Fee Reimbursement Scheme",
        "eligibility": "1. For MBBS/BDS and other courses candidates who's Family's annual income < Rs.8,00,000.2. Candidates are eligible those who have taken an admission under General category and SEBC Category",
        "links": "https://mahadbt.maharashtra.gov.in//SchemeData/SchemeData?str=E9DDFA703C38E51ADB3BC6C89611BF9A"
    },
    {
        "name": "Dr Panjabrao Deshmukh Hostel Maintenance Allowance",
        "eligibility": "For Students who had taken admission for MBBS,BDS,BAMS,BHMS,BPTH,BOTH,B.SC Nursing ,BUMS, BP & O, BASLP in government aided/Corporation/Private un-aided colleges. \n Family's Annual income is less than equal to Rs.8,00,000 .\n For students whose parents are Alpabhudharak Shetkari/registered labourers. \n Hostel maintenance allowance for student's with annual income less than 1, 00,000: Rs.3000 per year for Mumbai ,Pune ,Nagpur ,Aurangabad and Rs.2000 per year for other locations.(for 10months in a academic year).\n Hostel maintenance allowance for student's whose parents are Aplabhudharak shetkari/Registered Labourers : Rs.30,000 per year for Mumbai ,Pune ,Nagpur ,Aurangabad and Rs.20,000 per year for other locations(for 10months in a academic year). \n Not applicable for students pursuing admission through management quota/Institute level. \n Students who have taken hostel admission in Mumbai ,Pune ,Aurangabad ,Nagpur or other locations in Maharashtra.\nCandidates are eligible those who have taken an admission under General category and SEBC Category",
        "links": "https://mahadbt.maharashtra.gov.in//SchemeData/SchemeData?str=E9DDFA703C38E51AA5337B52CE309785"
    },
    {
        "name": "Education Fee reimbursement for open category students affected due to SEBC and EWS reservation in medical and Dental colleges",
        "eligibility": "1. Applicant should belong to Open category. (Total 112 applicants are going to take benefit of this scheme) 2. Applicant should have taken admission through CAP.3. No scholarship for Management Quota Admission.4. No Income criteria check for this scheme.5. Applicant should be domicile of Maharashtra.6. Deemed university students are not applicable for this scheme.7. Applicant should not have gap of 2 or more than 2 year in course duration.9. Failure in academic year, misconduct, not fulfilling attendance criteria if found then candidate will not be eligible.",
        "links": "https://mahadbt.maharashtra.gov.in//SchemeData/SchemeData?str=E9DDFA703C38E51A0789217992448C2E"
    },
    {
        "name": "State Minority Scholarship Part II (DHE)",
        "eligibility": "--( As Per GR Dated 14.10.2011) 1. Graduation and post-graduation can apply (arts/commerce/science/Law/Education)2.Domicile of Maharashtra.   3.Income should be upto Rs.8 lakhs4.Only 2000 applicants will be provided quota (freshers)5. Maharashtrian Students studying Out of Maharashtra cannot apply for this scheme.",
        "links": "https://mahadbt.maharashtra.gov.in//SchemeData/SchemeData?str=E9DDFA703C38E51A78F1DC35C6E48797"
    },
    {
        "name": "Scholarship for students of minority communities pursuing Higher and Professional courses(DTE)",
        "eligibility": "a) Applicant should have Nationality of India.b) Candidate should be Domicile of Maharashtra State. c) Candidates should have pass SSC from Maharashtra State.d) Applicant should be \u201dBonafide Student of Institute\u201d and admitted for Professional and Technical course (Diploma / Graduation / Post Graduation Degree) as mentioned in GR e) Candidate should be admitted through Centralized Admission Process (CAP) / Institute Level.f) Applicant should not avail any other scholarship/stipend.g) The Total Annual Income of Family / Guardian should not be more than 8 Lakhs.",
        "links": "https://mahadbt.maharashtra.gov.in//SchemeData/SchemeData?str=E9DDFA703C38E51A10CD9E828AFD9209"
    },
    {
        "name": "Scholarship for students of minority communities pursuing Higher and Professional courses(DMER)",
        "eligibility": "For students who had taken admission from MBBS ,BDS ,BAMS ,BHMS ,BUMS, BPTH ,BOTH ,BASLP ,BP&O ,BSc Nursing ,MSc Nursing ,BPMT,OPTHALMIC ASST.,OPTOMETRY,PB BSc Nursing  and courses affiliated to Maharashtra university of health science, Nashik. \n Family\u2019s Annual Income less than equal to 8,00,000.\n Admission to the course should be through CET/competitive exam/HSC marks obtained.\n 30%scholarship is reserved for girls. First list of 70% students (combined) is prepared and after that 30% girls scholarship will be selected which are not included in 70% list. \n The person should be Domicile of Maharashtra.\n If targeted amount of scholarship for particular minority community is not achieved then other minority community student\u2019s scholarship can be included in it.\n Also applicable for candidate studying outside Maharashtra, but he/she must be a domicile of Maharashtra/resident of Maharashtra since 15years.\nIf candidate is studying outside Maharashtra the following documents need to be submitted : Letter from concerned council/Authority stating the institute is recognized.\nCopy of FRA\nBonafide for current academic year",
        "links": "https://mahadbt.maharashtra.gov.in//SchemeData/SchemeData?str=E9DDFA703C38E51A61FF7871E24FE19D"
    },
    {
        "name": "Scholarship for students of minority communities pursuing Higher and Professional courses of MCAER Department",
        "eligibility": "a)\t Applicant should have Nationality of India.b)\t Candidate should be Domicile of Maharashtra State.c)\tCandidates should have pass SSC from Maharashtra State.d)\tApplicant should be \u201dBonafide Student of Institute\u201d and admitted for Professional and Technical course (Graduation / Post Graduation Degree) as mentioned in GR.e)\tCandidate should be admitted through Centralized Admission Process (CAP) / Institute Level.f)\tApplicant should not avail any other scholarship/stipend.g)\tThe Total Annual Income of Family / Guardian should not be more than 8 Lakhs.h)\tAny  two chilldrens from family will be alotted for a scheme.",
        "links": "https://mahadbt.maharashtra.gov.in//SchemeData/SchemeData?str=E9DDFA703C38E51A20148FA060AA7BC5"
    },
    {
        "name": "Vocational Training Fee reimbursement for the students belonging to socially and educationally backward class and Open Category (Economically weaker section) students",
        "eligibility": "( As Per GR Dated 29.05.2019) 1. Admission taken through PPP scheme in Government Industrial Training Institute or Private Industrial Training Institute and admitted through central Online Admission Process.2.No scholarship for Management Quota Admission.   3.Student should belong to OPEN Category and Economical Weaker Section (EWS).4.Overall Family Income will be considered (Father + Mother Income)5.Orphan candidate requires Recommendation Letter.6.Candidate should not have taken any benefit for course previously from Government or Private ITI.7.Candidate should not have taken any benefit for training program sponsored by State / Central Government / Department / Local Body / Company or Corporation.8.Domicile of Maharashtra.9.Admission taken for DGT, New Delhi or MSCVT approved courses.10.Benefit applicable to only 2 children.11.Attendance criteria is mandatory.12.Candidate need to attend each semester /annual exam. If any medical emergency then after recommendation by institute Regional Joint Director should certify or recommend.13.Non Satisfactory educational progress due to misconduct- Failure in academic year, not fulfilling attendance criteria if found then candidate will not be eligible for scholarship.",
        "links": "https://mahadbt.maharashtra.gov.in//SchemeData/SchemeData?str=E9DDFA703C38E51A6B32D7E54C4EFF76"
    },
    {
        "name": "Stipend of Rs. 500 per month for trainees in Craftsman Training Scheme in Govt ITI",
        "eligibility": "1. The trainee should be domicile in Maharashtra.2. The annual income should not exceed Rs. 8 lac. Future amendments made by the Government of Maharashtra (GoM) for non-creamy layer criteria will be applicable. 3. Only two siblings within a family are eligible for this benefit. 4. The benefit will be provided in two installments. 5. Maintaining an average of 80% attendance is mandatory.6. For trainees enrolled in a 2-year duration trade, passing the first year is necessary. 7. SC trainees with an annual income of less than Rs. 2.5 lac are also eligible for the Post Matric Scholarship.8. Trainees suspended or found non-eligible for the All India Trade Test (AITT) will not qualify.  9. Trainees who have left the GITI are not eligible from their date of departure.  10. Having an Aadhar-seeded savings bank account in a nationalized bank is mandatory.  11. Trainee registration on the MAHA-DBT portal is compulsory.12. The scheme will be implemented exclusively through the MAHA-DBT portal. 13. Trainees in PITI are ineligible for this scheme.",
        "links": "https://mahadbt.maharashtra.gov.in//SchemeData/SchemeData?str=E9DDFA703C38E51A475C1F6D3C39E3F8"
    },
    {
        "name": "Rajarshi Chhatrapati Shahu Maharaj Shikshan Shulkh Shishyavrutti Yojna(EBC)",
        "eligibility": "Eligibility Criteria: (As per the GR Dated 07th Oct 2017,01st March 2018, 31st March 2018) and 14th January 2019\na) Applicant should have Nationality of India.\nb) Candidate should be Domicile of Maharashtra State.\u00a0\nc) Applicant should be \u201dBonafide Student of Institute\u201d and admitted for Professional & Non Professional and Technical course (Diploma / Graduation / Post Graduation Degree) as mentioned in GR\u00a014th January 2019\nd) Deemed University and Private university is not applicable\ne) Candidate should be admitted through Centralized Admission Process (CAP).\u00a0\nf) Applicant should not avail any other scholarship/stipend.\ng) For current Academic Year, Only 2 child from family are allowed for benefit of scheme.\nh) The Total Annual Income of Family / Guardian should not be more than 8 Lakhs.\ni) Minimum 50 % attendance in previous semester (Exception for fresh admitted in College).\u00a0\nj) During course duration, candidate should not have a gap of 2 or more than 2 years.k) Candidates are eligible those who have taken an admission under General category and SEBC Category",
        "links": "https://mahadbt.maharashtra.gov.in//SchemeData/SchemeData?str=E9DDFA703C38E51A50495B1E79CEAF71"
    },
    {
        "name": "Dr. Panjabrao Deshmukh Vasatigruh Nirvah Bhatta Yojna (AGR)",
        "eligibility": "Eligibility Criteria: (As per the GR Dated 07th Oct 2017, 22nd Feb 2018 , 01st March 2018, 18th June 2018 , 11th July 2019)\na) Applicant should have Nationality of India.\nb) Candidate should be Domicile of Maharashtra State.\u00a0\nc) Applicant should be \u201dBonafide Student of Institute\u201d and admitted for Professional and Technical course (Diploma / Graduation / Post Graduation Degree) as mentioned in GR\u00a0\nd) Deemed University and Private university is not applicable\ne) Candidate should be admitted through Centralized Admission Process (CAP).\u00a0\nf) Applicant should not avail any other scholarship/stipend.\ng) For current Academic Year, Only 2 child from family are allowed for benefit of scheme.\nh) The Total Annual Income of Family / Guardian should not be more than 8 Lakhs.\ni) Minimum 50 % attendance in previous semester (Exception for fresh admitted in College).\u00a0\nj) During course duration, candidate should not have a gap of 2 or more than 2 years.\u00a0k) Candidates are eligible those who have taken an admission under General category and SEBC Category",
        "links": "https://mahadbt.maharashtra.gov.in//SchemeData/SchemeData?str=E9DDFA703C38E51AD36E29BD04FB95F2"
    },
    {
        "name": "Rajarshi Chhatrapati Shahu Maharaj Shikshan Shulkh Shishyavrutti Yojna(EBC)",
        "eligibility": "( As Per GR Dated 7.10.2017 , 31.3.2018 & 07.08.2018 ) 1. Applicant should be Domicile of Maharashtra and applicant belongs to Maharashtra State and Karnataka state border can apply for scheme. 2. Family annual income limit is upto Rs. 8.00 lakh. 3. As per Government Resolution first two children are eligible for scheme.4. Candidate those who take admission under general category is eligible.5. Applicant should not avail any other scholarship or stipend.6. Students are not eligible who has taken an admission in Distance Education, virtual learning and part time courses. 7.During course, candidate should not have a gap of 2 years.8 .Applicant should attempt every semester or annual exam.",
        "links": "https://mahadbt.maharashtra.gov.in//SchemeData/SchemeData?str=E9DDFA703C38E51A4CECAB91C2B36920"
    },
    {
        "name": "Dr. Panjabrao Deshmukh Vasatigruh Nirvah Bhatta Yojna (DOA)",
        "eligibility": "( As Per GR Dated 7.10.2017 , 31.3.2018 & 07.08.2018 ) 1. Applicant should be Domicile of Maharashtra. 2. For professional courses, Applicant should be a child of registered labor , child of  Alpabhudarak or both as total annual income of family/ Guardian should not be more than 8 lakh. 3. Applicant should submit Family Annual Income Certificate. 4. As per Government Resolution first two children eligible for scheme. 5. Candidates are eligible those who have taken an admission under general category.6. Applicant should be hosteller.(Govt/Private hostel/ Paying Guest/ Tenant.) 7. Applicant should not avail any other Nirvah Bhatta benefit. 8. During course, candidate should not have a gap of 2 years. 9. Applicant should attempt every semester or annual exam.",
        "links": "https://mahadbt.maharashtra.gov.in//SchemeData/SchemeData?str=E9DDFA703C38E51AFF59C835471DFEAE"
    },
    {
        "name": "Rajarshi Chhatrapati Shahu Maharaj Shikshan Shulkh Shishyavrutti Yojna(EBC)",
        "eligibility": "( As per the GR Dated 01st March 2018 - 07th October 2017 ) 1. Applicant should have Nationality of India. 2. Candidate should be Domicile of Maharashtra State.3. Applicant should be \u201dBonafide Studentof Institute\u201d and admitted for Professional  and Technical course (Graduation / Post Graduation Degree) as mentioned in GR.4. Deemed University and Private university is not applicable.5. Candidate should be admitted through Centralized Admission Process (CAP). 6. Applicant should not avail any other scholarship/stipend.7. For current Academic Year, Only 2 child from family are allowed for benefit of scheme.8. The Total Annual Income of Family / Guardian should not be more than 8 Lakhs.9. Minimum 50 % attendance in previous semester (Exception for fresh admitted in College). 10.During course duration, candidate should not have a gap of 2 years. 11.Candidates are eligible those who have taken an admission under general category.12.Applicant should attempt every semester or annual exam.",
        "links": "https://mahadbt.maharashtra.gov.in//SchemeData/SchemeData?str=E9DDFA703C38E51AA804BF8946610BEA"
    },
    {
        "name": "Dr. Panjabrao Deshmukh Vasatigruh Nirvah Bhatta Yojna (MAFSU)",
        "eligibility": "a). Applicant should have Nationality of India.b). Candidate should be Domicile of Maharashtra State.  c). Applicant should be \u201dBonafide Student of Institute\u201d and admitted for Professional  and Technical course (Graduation / Post Graduation Degree) as mentioned in GR.  d). Deemed University and Private university is not applicable.e). Candidate should be admitted through Centralized Admission Process (CAP).f). Applicant should not avail any other Maintenance Allowance Scheme.g). For current Academic Year, Only 2 child from family are allowed for benefit of scheme.h). Applicant should be child of Registered Labour or Child of Alpabhudharak or Both / Total Annual Income of Family / Guardian should not be more than 6 Lakhs.i). Minimum 50 % attendance in previous semester (Exception for fresh admitted in College). j). During course duration, candidate should not have a gap of 2 years.k). Applicant should be Hosteller.l). Should not avail maintenance allowance of any other scheme.m). Candidates are eligible those who have taken an admission under general category.n). Applicant should attempt every semester or annual exam.",
        "links": "https://mahadbt.maharashtra.gov.in//SchemeData/SchemeData?str=E9DDFA703C38E51AE5A44C72C454E753"
    }
];


const ScholarshipList = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const [recommendedScholarships, setRecommendedScholarships] = useState([]);
    const { user } = useContext(StateContext);

    // This will hold the original scholarships list
    const filteredScholarships = scholarships.filter(scholarship =>
        scholarship.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleGetRecommendations = async () => {
        console.log("Getting recommendations...");

        try {
            const response = await axios.get(`/student/get-by-id/${user.id}`, {
                headers: {
                    Authorization: `Bearer ${user.token}`,
                    "Cache-Control": "no-cache",
                    Pragma: "no-cache",
                    Expires: "0",
                }
            });

            const data = await response.data.data;

            const llmData = `
                I am a ${data.caste} student from Maharashtra. 
                My family's annual income is ${data.parentAnualIncome}. 
                I have passed SSC and am looking for scholarship opportunities.
            `;
            console.log("Student data:", data);

            const pyResponse = await fetch('http://192.168.137.74:5000/get_recommendations', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ user_profile: llmData }),
            });

            const pyData = await pyResponse.json();
            console.log("Recommendations received:", pyData.recommendations);

            // Set the received recommendations in the state
            setRecommendedScholarships(pyData.recommendations);
        } catch (error) {
            console.error("Error fetching recommendations:", error);
        }
    };

    const maxCardHeight = "300px"; // Set a fixed height for all cards

    return (
        <div className="max-w-7xl mx-auto p-8 bg-gray-100 shadow-lg rounded-lg mt-10">
            <h2 className="text-4xl font-bold text-center text-indigo-600 mb-8">All Scholarships</h2>

            {/* Search Input */}
            <div className="flex mb-4">
                <input
                    type="text"
                    placeholder="Search Scholarships..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="border border-gray-300 rounded-l-md p-3 flex-grow focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
                <button 
                    className="bg-indigo-600 text-white rounded-r-md p-3 flex items-center hover:bg-indigo-700 transition duration-300">
                    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-4.35-4.35M16.5 10.5A6 6 0 108.5 10.5a6 6 0 008 0z" />
                    </svg>
                </button>
            </div>

            {/* Recommend Scholarships Button */}
            <button
                onClick={handleGetRecommendations}
                className="mb-6 w-full bg-indigo-600 text-white font-bold py-3 rounded-md hover:bg-indigo-700 transition duration-300"
            >
                Recommend Scholarships
            </button>

            {/* Scholarships List */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredScholarships.map((scholarship, index) => (
                    <div
                        key={index}
                        className="p-6 border border-gray-200 rounded-lg shadow-md hover:shadow-xl transition duration-300 bg-white"
                        style={{ height: maxCardHeight }}
                    >
                        <h3 className="text-xl font-bold text-indigo-600 mb-2">{scholarship.name}</h3>
                        <p className="mt-2 text-gray-700 overflow-hidden" style={{ maxHeight: "100px", overflowY: "hidden" }}>
                            {scholarship.eligibility.split('\n').map((line, i) => (
                                <span key={i} className="block">{line}</span>
                            ))}
                        </p>
                        {scholarship.eligibility.length > 100 && (
                            <a href="#" className="text-indigo-500 hover:underline mt-2 inline-block" onClick={(e) => {
                                e.preventDefault();
                                alert(scholarship.eligibility); // Show full eligibility details in an alert (or you can implement a modal for better UX)
                            }}>
                                Read More
                            </a>
                        )}
                        <a href={scholarship.links} className="w-full bg-indigo-600 text-white font-bold p-2 m-4 rounded-md hover:bg-indigo-700 transition duration-300" target="_blank" rel="noopener noreferrer">
                            Apply Here
                        </a>
                    </div>
                ))}

                {/* Recommended Scholarships Section */}
                {recommendedScholarships.length > 0 && (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-10">
                        <h2 className="text-3xl font-bold text-center text-indigo-600 mb-8">Recommended Scholarships</h2>
                        {recommendedScholarships.map((scholarship, index) => (
                            <div
                                key={index}
                                className="p-6 border border-gray-200 rounded-lg shadow-md hover:shadow-xl transition duration-300 bg-white"
                                style={{ height: maxCardHeight }}
                            >
                                <h3 className="text-xl font-bold text-indigo-600 mb-2">{scholarship.name}</h3>
                                <p className="mt-2 text-gray-700 overflow-hidden" style={{ maxHeight: "100px", overflowY: "hidden" }}>
                                    {scholarship.eligibility.split('\n').map((line, i) => (
                                        <span key={i} className="block">{line}</span>
                                    ))}
                                </p>
                                {scholarship.eligibility.length > 100 && (
                                    <a href="#" className="text-indigo-500 hover:underline mt-2 inline-block" onClick={(e) => {
                                        e.preventDefault();
                                        alert(scholarship.eligibility); // Show full eligibility details in an alert (or you can implement a modal for better UX)
                                    }}>
                                        Read More
                                    </a>
                                )}
                                <a href={scholarship.links} className="w-full bg-indigo-600 text-white font-bold p-2 m-4 rounded-md hover:bg-indigo-700 transition duration-300" target="_blank" rel="noopener noreferrer">
                                    Apply Here
                                </a>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default ScholarshipList;
