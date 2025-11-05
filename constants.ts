import { Student, Subject, AttendanceRecord, LeaveRequest, User, AttendanceStatus, LeaveStatus, UserRole, TimetableEntry, DayOfWeek } from './types';

const studentDataList = [
    { rollNumber: '310624243001', name: 'AAKASH S' },
    { rollNumber: '310624243002', name: 'AALIYA' },
    { rollNumber: '310624243003', name: 'ABDUL RAHMAN.N' },
    { rollNumber: '310624243004', name: 'ABHINAVA ASHWIN. R' },
    { rollNumber: '310624243005', name: 'ABIMANYU N' },
    { rollNumber: '310624243006', name: 'ABUBAKKAR M' },
    { rollNumber: '310624243007', name: 'ABUBUCKER SIDDIQUE S' },
    { rollNumber: '310624243008', name: 'ADHITHYA D' },
    { rollNumber: '310624243009', name: 'ADITHYA P K' },
    { rollNumber: '310624243010', name: 'ADITI SANESH' },
    { rollNumber: '310624243011', name: 'AGALYA G' },
    { rollNumber: '310624243012', name: 'AGNUS FELICIA SHARMA' },
    { rollNumber: '310624243013', name: 'S.K.AISHWARYA KRISHTHEE' },
    { rollNumber: '310624243014', name: 'AISHWARYA R' },
    { rollNumber: '310624243015', name: 'AJITH B' },
    { rollNumber: '310624243016', name: 'AKASH SRI GANESAN S' },
    { rollNumber: '310624243017', name: 'AKSHAYA B' },
    { rollNumber: '310624243018', name: 'AMIRTHA.P' },
    { rollNumber: '310624243019', name: 'A. AMRIETH' },
    { rollNumber: '310624243020', name: 'ARAVIND M' },
    { rollNumber: '310624243021', name: 'S. ARAVIND SUGUMAR' },
    { rollNumber: '310624243022', name: 'ARUN KUMAR R' },
    { rollNumber: '310624243023', name: 'ASHWIN.R' },
    { rollNumber: '310624243024', name: 'BALAJI R' },
    { rollNumber: '310624243025', name: 'BAVITHRAN V' },
    { rollNumber: '310624243026', name: 'K.BHUPESH KUMAR' },
    { rollNumber: '310624243027', name: 'BHUVANESH SAMINATHAN' },
    { rollNumber: '310624243028', name: 'BRINDAA B' },
    { rollNumber: '310624243029', name: 'CHARAN RAJU M' },
    { rollNumber: '310624243030', name: 'CHARAN S' },
    { rollNumber: '310624243031', name: 'CHARAN S' },
    { rollNumber: '310624243033', name: 'DANISH VASANTH T' },
    { rollNumber: '310624243034', name: 'DARSHAN JR' },
    { rollNumber: '310624243035', name: 'DEEPAK J U' },
    { rollNumber: '310624243036', name: 'DEEPAKRAM V' },
    { rollNumber: '310624243037', name: 'DEVIKA A' },
    { rollNumber: '310624243038', name: 'DEVIKA .V' },
    { rollNumber: '310624243039', name: 'DHANAVARDHINI S' },
    { rollNumber: '310624243040', name: 'DHEEKSHITH.R' },
    { rollNumber: '310624243041', name: 'DIKSHITHA.J' },
    { rollNumber: '310624243042', name: 'DIKSHITHA VISALI Y' },
    { rollNumber: '310624243043', name: 'DIVAKARAN P' },
    { rollNumber: '310624243044', name: 'DIVESH N' },
    { rollNumber: '310624243045', name: 'ELAKKIYA S' },
    { rollNumber: '310624243046', name: 'GEETHA SRI S' },
    { rollNumber: '310624243047', name: 'GURU PRASATH B' },
    { rollNumber: '310624243048', name: 'HARI KISHORE P' },
    { rollNumber: '310624243049', name: 'HARI KRISHNA.B' },
    { rollNumber: '310624243050', name: 'HARIHARAN .K' },
    { rollNumber: '310624243051', name: 'HARINI SRI R' },
    { rollNumber: '310624243052', name: 'HARINY S' },
    { rollNumber: '310624243053', name: 'HARISH G' },
    { rollNumber: '310624243054', name: 'HARISH V' },
    { rollNumber: '310624243055', name: 'HARSHIDHA.R' },
    { rollNumber: '310624243606', name: 'T MONISH RAGAV' },
    { rollNumber: '310624243701', name: 'KR.HARITHA' },
    { rollNumber: '310624243613', name: 'THARUN RAJ M' },
];

const parentPhoneNumbers = [
    '9865887223', '9940016481', '9884468555', '9841005264', '9751391392',
    '9965411009', '9941499773', '9383390905', '9884760017', '9444034793',
    '9655534409', '9486880068', '9840915141', '8124459373', '9566203360',
    '9677337050', '7708144059', '9840070050', '9940458810', '9941118190',
    '9655777077', '9840994372', '9445299648', '8939465573', '9791796192',
    '9585972964', '9884508565', '9884678887', '9566136725', '6383573182',
    '8056286118', '8754704083', '9840032228', '8939541940', '9047429647',
    '8220133107', '6380795928', '9840511788', '9940264545', '9841235686',
    '8825747516', '9444287211', '9941404866', '9840101391', '9094974512',
    '7395972679', '9841443168', '9444207619', '9444260257', '9884222444',
    '9840177538', '9841599215', '9444136408', '9344090537', '9865957190',
    '9840948721', '9962791880'
];

const STUDENT_DETAILS = [
    { regNumber: '310624243001', name: 'AAKASH S', gender: 'MALE', studentEmail: 'saakash02310@gmail.com', officialEmail: '310624243001@eec.srmrmp.edu.in', studentMobile: '7305681845', tenthPercentage: '83.8', twelfthPercentage: '76.3', sem1Cgpa: '7.5', sem2Cgpa: '7.9', overallCgpa: '7.7', aadhar: '228050773610', quota: 'Management', dob: '23-10-2006', religion: 'Hindu', community: 'OC', address: 'FE,Anbu Apartments ,Eri Scheme , 1st Main road, Mogappair West, Chennai -600037', fatherName: 'Suresh S', fatherOccupation: 'Private sector', fatherMobile: '9865887223', motherName: 'Gayatri S', motherOccupation: 'Home Maker', motherMobile: '7550022294', siblingDetails: 'Balasubramanian' },
    { regNumber: '310624243002', name: 'AALIYA', gender: 'FEMALE', studentEmail: 'aaliyajay1805@gmail.com', officialEmail: '310624243002@eec.srmrmp.edu.in', studentMobile: '6383393654', tenthPercentage: '66.6', twelfthPercentage: '70.3', sem1Cgpa: '7.36', sem2Cgpa: '7.47', overallCgpa: '7.41', aadhar: '372869958523', quota: 'Management', dob: '18-05-2006', religion: 'Hindu', community: 'OC', address: 'F407, Sidharth upscale apartments,kundrathur main road, madhanandhapuram-Porur,chennai-116', fatherName: 'Jayasankar', fatherOccupation: 'CTO (Private firm)', fatherMobile: '9940016481', motherName: 'Nafesa', motherOccupation: 'Home Maker', motherMobile: '9566035127', siblingDetails: 'Shraddha' },
    { regNumber: '310624243003', name: 'ABDUL RAHMAN.N', gender: 'MALE', studentEmail: 'abdulrahman110627@gmail.com', officialEmail: '310624243003@eec.srmrmp.edu.in', studentMobile: '8939720547', tenthPercentage: '63', twelfthPercentage: '73', sem1Cgpa: '8', sem2Cgpa: '8', overallCgpa: '8', aadhar: '523499978411', quota: 'Management', dob: '11-6-2007', religion: 'Muslim', community: 'BC', address: 'No.3,Dr.Ambekar Salai, Valasaravakkam,Chennai-600087', fatherName: 'Nalla Mohamed.M', fatherOccupation: 'Business', fatherMobile: '9884468555', motherName: 'Shakila Banu.N', motherOccupation: 'Home Maker', motherMobile: '9884468555', siblingDetails: 'Kathija.N' },
    { regNumber: '310624243004', name: 'ABHINAVA ASHWIN. R', gender: 'MALE', studentEmail: 'abhinavaashwin@gmail.com', officialEmail: '310624243004@eec.srmrmp.edu.in', studentMobile: '7200901232', tenthPercentage: '92.4', twelfthPercentage: '93.33', sem1Cgpa: '8.5', sem2Cgpa: '8.71', overallCgpa: '8.605', aadhar: '563145694980', quota: 'Government', dob: '05-11-2006', religion: 'Hindu', community: 'BC', address: '127/43, Old Mambalam Road, West Mambalam, Chennai - 600033.', fatherName: 'Raju. M', fatherOccupation: 'Business', fatherMobile: '9841005264', motherName: 'Sasikala. R', motherOccupation: 'Home Maker', motherMobile: '8122005264', siblingDetails: 'Sanjeeva Saravanan. S' },
    { regNumber: '310624243005', name: 'ABIMANYU N', gender: 'MALE', studentEmail: 'abimanyuags1@gmail.com', officialEmail: '310624243005@eec.srmrmp.edu.in', studentMobile: '8838779008', tenthPercentage: '84.5', twelfthPercentage: '90', sem1Cgpa: '8.14', sem2Cgpa: '8.33', overallCgpa: '8.23', aadhar: '787106713174', quota: 'Government', dob: '26/07/2007', religion: 'Hindu', community: 'BC', address: '48, New street East,Chinnasalem, Kallakurichi-606201.', fatherName: 'Nagaraj P', fatherOccupation: 'Driver', fatherMobile: '9751391392', motherName: 'Abirami N', motherOccupation: 'Home Maker', motherMobile: '9751391372', siblingDetails: 'Arunika N' },
    { regNumber: '310624243006', name: 'ABUBAKKAR M', gender: 'MALE', studentEmail: 'abubakkar0505786@gmail.com', officialEmail: '310624243006@eec.srmrmp.edu.in', studentMobile: '7904750561', tenthPercentage: '80.6', twelfthPercentage: '91.5', sem1Cgpa: '8.23', sem2Cgpa: '7.81', overallCgpa: '8.02', aadhar: '937912914965', quota: 'Government', dob: '09-12-2006', religion: 'Muslim', community: 'BCM', address: '769,Pallivasal street,Gopalapattinam,Mimisal post,Avudayarkovil Taluka,Nattanipurasakudi,Pudukottai,Mimisal,Tamil nadu,614621', fatherName: 'Mujibur Rahman .A', fatherOccupation: 'Engineering', fatherMobile: '9965411009', motherName: 'Jennathul firthausia', motherOccupation: 'house wife', motherMobile: '7373999581', siblingDetails: 'Mohammed Hammudh.M' },
    { regNumber: '310624243007', name: 'ABUBUCKER SIDDIQUE S', gender: 'MALE', studentEmail: 'siddiqueabubucker1@gmail.com', officialEmail: '310624243007@eec.srmrmp.edu.in', studentMobile: '8778916329', tenthPercentage: '75.4', twelfthPercentage: '75.6', sem1Cgpa: '8.1', sem2Cgpa: '8', overallCgpa: '8.05', aadhar: '611682829848', quota: 'Management', dob: '01-02-2007', religion: 'Muslim', community: 'BCM', address: '35,Albert Castle,periyar nagar 6th street,madipakkam chennai-600091', fatherName: 'Sayyed Ahmed Kabeer KM', fatherOccupation: 'business', fatherMobile: '9941499773', motherName: 'Ayesha S', motherOccupation: 'Home maker', motherMobile: '9500097937', siblingDetails: 'Muhammed yusuf S' },
    { regNumber: '310624243008', name: 'ADHITHYA D', gender: 'MALE', studentEmail: 'dadithya68@gmail.com', officialEmail: '310624243008@eec.srmrmp.edu.in', studentMobile: '9445573022', tenthPercentage: '74%', twelfthPercentage: '85.00%', sem1Cgpa: '7.96', sem2Cgpa: '8', overallCgpa: '7.98', aadhar: '941079329091', quota: 'Government', dob: '10-10-2006', religion: 'Hindu', community: 'MBC', address: '73/29 SPS 1st street Royapettah,chennai 600014', fatherName: 'Durai P', fatherOccupation: 'business', fatherMobile: '9383390905', motherName: 'Rajasundari D', motherOccupation: 'House Maker', motherMobile: '9003051202', siblingDetails: 'karthikeyan.D' },
    { regNumber: '310624243009', name: 'ADITHYA P K', gender: 'MALE', studentEmail: 'apk050406@gmail.com', officialEmail: '310624243009@eec.srmrmp.edu.in', studentMobile: '8825999409', tenthPercentage: '80%', twelfthPercentage: '82.80%', sem1Cgpa: '8.77', sem2Cgpa: '8.48', overallCgpa: '8.62', aadhar: '592800212756', quota: 'Management', dob: '05-04-2006', religion: 'Hindu', community: 'MBC', address: '42/19/1, Chinnappa Ravuthar Street, Triplicane, Chennai - 600005', fatherName: 'Parameshwaran M', fatherOccupation: 'NIL', fatherMobile: 'NIL', motherName: 'Kavitha P', motherOccupation: 'Private Sector', motherMobile: '9884760017', siblingDetails: 'NIL' },
    { regNumber: '310624243010', name: 'ADITI SANESH', gender: 'FEMALE', studentEmail: 'aditisanesh@gmail.com', officialEmail: '310624243010@eec.srmrmp.edu.in', studentMobile: '7200713138', tenthPercentage: '83.2', twelfthPercentage: '79.5', sem1Cgpa: '7.2', sem2Cgpa: '7.7', overallCgpa: '7.45', aadhar: '520767815443', quota: 'Management', dob: '04-11-2006', religion: 'Hindu', community: 'BC', address: '28/S-2,Velaven Flats,Sathyamurthy street,Devaraj Nagar,Saligramam,Chennai-600093', fatherName: 'Sanesh Kumar C.V', fatherOccupation: 'civil contractor', fatherMobile: '9444034793', motherName: 'Nisha Sanesh', motherOccupation: 'Nil', motherMobile: '8124417874', siblingDetails: 'Aadhya Sanesh' },
    { regNumber: '310624243011', name: 'AGALYA G', gender: 'FEMALE', studentEmail: 'agalyaganapathi2007@gmail.com', officialEmail: '310624243011@eec.srmrmp.edu.in', studentMobile: '9363072770', tenthPercentage: '83%', twelfthPercentage: '88%', sem1Cgpa: '8.2', sem2Cgpa: '8.3', overallCgpa: '8.2', aadhar: '346639099857', quota: 'Government (7.5)', dob: '27-01-2007', religion: 'Hindu', community: 'BC', address: '18,Kondalam pudhur, Thattampalayam (po),sivagiri (via),Erode', fatherName: 'K Ganapathi', fatherOccupation: 'Farmer', fatherMobile: '9655534409', motherName: 'Jothimani', motherOccupation: 'House wife', motherMobile: '8526090901', siblingDetails: 'Aravinth G' },
    { regNumber: '310624243012', name: 'AGNUS FELICIA SHARMA', gender: 'FEMALE', studentEmail: 'agnusfelicia@gmail.com', officialEmail: '310624243012@eec.srmrmp.edu.in', studentMobile: '6384060979', tenthPercentage: '91%', twelfthPercentage: '83.60%', sem1Cgpa: '8.23', sem2Cgpa: '7.95', overallCgpa: '8.09', aadhar: '704439628100', quota: 'Management', dob: '22-05-2006', religion: 'Christian', community: 'BC', address: '16/58 mosques street, great nagar,Navalpur,Ranipet-632401', fatherName: 'G D Sharma', fatherOccupation: 'NIL', fatherMobile: 'NIL', motherName: 'Mekalai Devi A', motherOccupation: 'Lecturer', motherMobile: '9486880068', siblingDetails: 'Prasanna Rubavathy , Nerthi Patricia' },
    { regNumber: '310624243013', name: 'S.K.AISHWARYA KRISHTHEE', gender: 'FEMALE', studentEmail: 'krish2504aishu@gmail.com', officialEmail: '310624243013@eec.srmrmp.edu.in', studentMobile: '7200960179', tenthPercentage: '91.2', twelfthPercentage: '86.2', sem1Cgpa: '8.6', sem2Cgpa: '8.3', overallCgpa: '8.46', aadhar: '788968987296', quota: 'Management', dob: '25-11-2006', religion: 'Hindu', community: 'OBC', address: 'Ap 1323,33rd street, 7th sector, Kk nagar, Chennai-78', fatherName: 'A.Senthil Kumar', fatherOccupation: 'Private Sector', fatherMobile: '9840915141', motherName: 'S.Kotteswari', motherOccupation: 'Home maker', motherMobile: '9840904479', siblingDetails: 'NIL' },
    { regNumber: '310624243014', name: 'AISHWARYA R', gender: 'FEMALE', studentEmail: 'aishramesh0631@gmail.com', officialEmail: '310624243014@eec.srmrmp.edu.in', studentMobile: '9488641898', tenthPercentage: '89%', twelfthPercentage: '75%', sem1Cgpa: '8.23', sem2Cgpa: '8.76', overallCgpa: '8.4', aadhar: '803964744125', quota: 'Management', dob: '31-08-2006', religion: 'Hindu', community: 'BC', address: '83,A4 Thulsi ramachandra apartments, kailasanathar kovil street, gerugambakkam chennai 600122', fatherName: 'Ramesh T', fatherOccupation: 'Employee', fatherMobile: '8124459373', motherName: 'Ajitha P', motherOccupation: 'Home maker', motherMobile: '9488725898', siblingDetails: 'Akshara R' },
    { regNumber: '310624243015', name: 'AJITH B', gender: 'MALE', studentEmail: 'vbabu8713@gmail.com', officialEmail: '310624243015@eec.srmrmp.edu.in', studentMobile: '9940557609', tenthPercentage: '75%', twelfthPercentage: '89%', sem1Cgpa: '8.32', sem2Cgpa: '8.38', overallCgpa: '8.35', aadhar: '752489999620', quota: 'government', dob: '01-06-2006', religion: 'Hindu', community: 'MBC', address: 'door no:158,3rd Block, Mugappair west, chennai 37', fatherName: 'Babu V', fatherOccupation: 'self employee', fatherMobile: '9566203360', motherName: 'Usha B', motherOccupation: 'home maker', motherMobile: '8754416643', siblingDetails: 'Ashwin.B' },
    { regNumber: '310624243016', name: 'AKASH SRI GANESAN S', gender: 'MALE', studentEmail: 'akash.radhikasomu@gmail.com', officialEmail: '310624243016@eec.srmrmp.edu.in', studentMobile: '6382598002', tenthPercentage: '87.20%', twelfthPercentage: '85.50%', sem1Cgpa: '7.09', sem2Cgpa: '7.48', overallCgpa: '7.28', aadhar: '854995224977', quota: 'Government', dob: '14-06-2006', religion: 'Hindu', community: 'BC', address: '12/35,Chinna Chetty Street ,Chidambaram-608001', fatherName: 'Somasundaram G', fatherOccupation: 'Doctor', fatherMobile: '9677337050', motherName: 'Radhika S', motherOccupation: 'Home Maker', motherMobile: '9677336898', siblingDetails: 'Kaviya Meenakshi S' },
    { regNumber: '310624243017', name: 'AKSHAYA B', gender: 'FEMALE', studentEmail: 'akshayaabalamurugan8@gmail.com', officialEmail: '310624243017@eec.srmrmp.edu.in', studentMobile: '8825781452', tenthPercentage: '81.40%', twelfthPercentage: '90%', sem1Cgpa: '8.36', sem2Cgpa: '8.38', overallCgpa: '8.38', aadhar: '393005946440', quota: 'government', dob: '10-07-2007', religion: 'Hindu', community: 'MBC', address: 'No 19, cooperative nagar, Seemangudi,sirkali, Mayiladuthurai district,609110', fatherName: 'Balamurugan K', fatherOccupation: 'private sector', fatherMobile: '7708144059', motherName: 'Bhuvaneshwari B', motherOccupation: 'Home maker', motherMobile: '7708144059', siblingDetails: 'Nil' },
    { regNumber: '310624243018', name: 'AMIRTHA.P', gender: 'FEMALE', studentEmail: 'amirthaprabagar1706@gmail.com', officialEmail: '310624243018@eec.srmrmp.edu.in', studentMobile: '8610981388', tenthPercentage: '78%', twelfthPercentage: '76', sem1Cgpa: '8.2', sem2Cgpa: '8.4', overallCgpa: '8.3', aadhar: '503399864881', quota: 'Management', dob: '01-07-2006', religion: 'Hindu', community: 'BC', address: '105/4,5th Street,Lakshmi Nagar,Madipakkam,Chennai-600091', fatherName: 'A.S.Prabagar', fatherOccupation: 'Business', fatherMobile: '9840070050', motherName: 'Amutha.P', motherOccupation: 'Business', motherMobile: '8838825221', siblingDetails: 'GuruPrakash.P' },
    { regNumber: '310624243019', name: 'A. AMRIETH', gender: 'MALE', studentEmail: 'amriethashokvijay@gmail.com', officialEmail: '310624243019@eec.srmrmp.edu.in', studentMobile: '8925285600', tenthPercentage: '80%', twelfthPercentage: '74%', sem1Cgpa: '7.75', sem2Cgpa: '7.95', overallCgpa: '7.85', aadhar: '692174175663', quota: 'Management', dob: '27-02-2007', religion: 'Hindu', community: 'Bc', address: 'Ap 1303 33rd Street 7th sector kk nagar chennai 78', fatherName: 'Ashokvijay', fatherOccupation: 'Business', fatherMobile: '9940458810', motherName: 'Kanimozhi', motherOccupation: 'Home maker', motherMobile: '8220474240', siblingDetails: 'Nil' },
    { regNumber: '310624243020', name: 'ARAVIND M', gender: 'MALE', studentEmail: 'aravindmahendran3@gmail.com', officialEmail: '310624243020@eec.srmrmp.edu.in', studentMobile: '7200429029', tenthPercentage: '73.2', twelfthPercentage: '79.2', sem1Cgpa: '8.18', sem2Cgpa: '8.05', overallCgpa: '8.115', aadhar: '629034543218', quota: 'Government', dob: '30-11-2006', religion: 'Hindu', community: 'SC', address: 'No 12 erikkari street ,ganapathypuram ,chromepet ,chennai-600044', fatherName: 'Mahendran P', fatherOccupation: 'Private sector', fatherMobile: '9941118190', motherName: 'Elizabath M', motherOccupation: 'Home maker', motherMobile: '9171023853', siblingDetails: 'Archana M' },
    { regNumber: '310624243021', name: 'S. ARAVIND SUGUMAR', gender: 'MALE', studentEmail: 'aravindsugumarceo@gmail.com', officialEmail: '310624243021@eec.srmrmp.edu.in', studentMobile: '9443538233', tenthPercentage: '75', twelfthPercentage: '78', sem1Cgpa: '7.5', sem2Cgpa: '6.5', overallCgpa: '7.75', aadhar: '786356334878', quota: 'management', dob: '19/09/2006', religion: 'Hindu', community: 'SC', address: 'no.17 vasan nagar near ragavendra nagar 100 feet road pondicherry 605005', fatherName: 's. sudhakar', fatherOccupation: 'business', fatherMobile: '9655777077', motherName: 's. kuttima', motherOccupation: 'SNO', motherMobile: '9944931931', siblingDetails: 'harishitha' },
    { regNumber: '310624243022', name: 'ARUN KUMAR R', gender: 'MALE', studentEmail: 'arunkumar.ravi2019@gmail.com', officialEmail: '310624243022@eec.srmrmp.edu.in', studentMobile: '7604872980', tenthPercentage: '93%', twelfthPercentage: '93%', sem1Cgpa: '8.27', sem2Cgpa: '8.52', overallCgpa: '8.395', aadhar: '722167240829', quota: 'Government', dob: '22-06-2006', religion: 'Hindu', community: 'BC', address: 'B-F1 Kgeyes Apoorva, gangai amman nagar extn ,Koyambedu,Chennai-600107', fatherName: 'Ravishankar J', fatherOccupation: 'Private sector', fatherMobile: '9840994372', motherName: 'Mohana S', motherOccupation: 'Home maker', motherMobile: '7598556664', siblingDetails: 'Suwetha R' },
    { regNumber: '310624243023', name: 'ASHWIN.R', gender: 'MALE', studentEmail: 'ashwin23ry10s@gmail.com', officialEmail: '310624243023@eec.srmrmp.edu.in', studentMobile: '7200538688', tenthPercentage: '67.70%', twelfthPercentage: '61', sem1Cgpa: '7.27', sem2Cgpa: '7.71', overallCgpa: '7.44', aadhar: '497784725557', quota: 'Management', dob: '23-10-2006', religion: 'Hindu', community: 'BC', address: 'NO.33 THIRU VIKA STREET NEHRU NAGAR VELACHERY CHENNAI -42', fatherName: 'RAMESH D', fatherOccupation: 'Government sector', fatherMobile: '9445299648', motherName: 'Sarala.R', motherOccupation: 'Home maker', motherMobile: '9003121545', siblingDetails: 'Priya.R' },
    { regNumber: '310624243024', name: 'BALAJI R', gender: 'MALE', studentEmail: 'rajarathinambalaji6@gmail.com', officialEmail: '310624243024@eec.srmrmp.edu.in', studentMobile: '8072421499', tenthPercentage: '74%', twelfthPercentage: '90%', sem1Cgpa: '8.23', sem2Cgpa: '8.19', overallCgpa: '8.21', aadhar: '302945312175', quota: 'Government', dob: '07/07/2006', religion: 'Hindu', community: 'MBC', address: '10/23,Samiyar madam,manali new town ,chennai-600103', fatherName: 'Rajarathinam J', fatherOccupation: 'NIL', fatherMobile: 'NIL', motherName: 'R.Jothilakshmi', motherOccupation: 'Home Maker', motherMobile: '8939465573', siblingDetails: 'R.Bharathi ,R.Vaishnavi' },
    { regNumber: '310624243025', name: 'BAVITHRAN V', gender: 'MALE', studentEmail: 'vvbavithran@gmail.com', officialEmail: '310624243025@eec.srmrmp.edu.in', studentMobile: '8667096016', tenthPercentage: 'Allpass', twelfthPercentage: '86%', sem1Cgpa: '8.36', sem2Cgpa: '8.38', overallCgpa: '8.38', aadhar: '294356950077', quota: 'government', dob: '19/04/2006', religion: 'Hindu', community: 'MBC', address: '123,A mariamman kovil st keelankangeyan kuppam panruti (tlk) cuddalore(district)', fatherName: 'velmurugan N', fatherOccupation: 'Farmer', fatherMobile: '9791796192', motherName: 'Rajeswari', motherOccupation: 'Home maker', motherMobile: '7868937835', siblingDetails: 'preethiviraj v' },
    { regNumber: '310624243026', name: 'K.BHUPESH KUMAR', gender: 'MALE', studentEmail: '17052006bhupeshkumar@gmail.com', officialEmail: '310624243026@eec.srmrmp.edu.in', studentMobile: '6381636235', tenthPercentage: '73.8', twelfthPercentage: '77.8', sem1Cgpa: '7.45', sem2Cgpa: '7.8', overallCgpa: '7.6', aadhar: '561402042551', quota: 'government', dob: '17/05/2006', religion: 'hindu', community: 'SC', address: '2/464-A2,Anand nagar ,kalai police station backside,krishnagiri-635002', fatherName: 'J.KALIAPPAN', fatherOccupation: 'private sector', fatherMobile: '9585972964', motherName: 'deepamani', motherOccupation: 'govt engineer', motherMobile: '9442317920', siblingDetails: 'k.vinu priya' },
    { regNumber: '310624243027', name: 'BHUVANESH SAMINATHAN', gender: 'MALE', studentEmail: 'bhuvaneshpro1234@gmail.com', officialEmail: '310624243027@eec.srmrmp.edu.in', studentMobile: '8925696480', tenthPercentage: '78', twelfthPercentage: '82', sem1Cgpa: '7.2', sem2Cgpa: '0', overallCgpa: '7.2', aadhar: '496289285081', quota: 'Government', dob: '24-11-2006', religion: 'Hindu', community: 'SC', address: 'Balaji Nagar 30th plot no 81 Street puzhuthivakkam Yogalakshmi flats chennai 600091', fatherName: 'Saminathan', fatherOccupation: 'Private Sector', fatherMobile: '9884508565', motherName: 'Uma', motherOccupation: 'NIL', motherMobile: '9962796480', siblingDetails: 'Sarvesh.S' },
    { regNumber: '310624243028', name: 'BRINDAA B', gender: 'FEMALE', studentEmail: 'brindaabharath@gmail.com', officialEmail: '310624243028@eec.srmrmp.edu.in', studentMobile: '9677132167', tenthPercentage: '85', twelfthPercentage: '84', sem1Cgpa: '8.76', sem2Cgpa: '8.86', overallCgpa: '8.79', aadhar: '471599324111', quota: 'Management', dob: '29-05-2007', religion: 'Hindu', community: 'BC', address: '17/41 Basha street , Choolaimedu , Chennai - 600094', fatherName: 'R Bharath Kumar', fatherOccupation: 'Salaried', fatherMobile: '9884678887', motherName: 'B Sivapriya', motherOccupation: 'Home Maker', motherMobile: '7200605123', siblingDetails: '-' },
    { regNumber: '310624243029', name: 'CHARAN RAJU M', gender: 'MALE', studentEmail: 'charanaithuu@gmail.com', officialEmail: '310624243029@eec.srmrmp.edu.in', studentMobile: '8122541904', tenthPercentage: '80.2', twelfthPercentage: '70', sem1Cgpa: 'withdrawal', sem2Cgpa: '7', overallCgpa: '', aadhar: '708334935352', quota: 'management', dob: '31-03-2006', religion: 'hindu', community: 'MBC', address: '46\\A rajive gandhi nagar,nerkundram,chennai107', fatherName: 'muniraju M', fatherOccupation: 'business', fatherMobile: '9566136725', motherName: 'geetha M', motherOccupation: 'house maker', motherMobile: '7397354201', siblingDetails: 'varshini m' },
    { regNumber: '310624243030', name: 'CHARAN S', gender: 'MALE', studentEmail: 'charanharshini7@gmail.com', officialEmail: '310624243030@eec.srmrmp.edu.in', studentMobile: '8056635095', tenthPercentage: '87', twelfthPercentage: '91', sem1Cgpa: '8', sem2Cgpa: '7.4', overallCgpa: '7.7', aadhar: '253765011957', quota: 'Government', dob: '10-12-2006', religion: 'Hindu', community: 'BC', address: 'No 7 navaratna garden,velisemmandalam, Cuddalore 607001', fatherName: 'Senthilkumar R', fatherOccupation: 'Teacher', fatherMobile: '6383573182', motherName: 'Selvarani P', motherOccupation: 'Teacher', motherMobile: '8248564743', siblingDetails: 'Sri harshini S' },
    { regNumber: '310624243031', name: 'CHARAN S', gender: 'MALE', studentEmail: 'charansugumar11@gmail.com', officialEmail: '310624243031@eec.srmrmp.edu.in', studentMobile: '8056696372', tenthPercentage: '80', twelfthPercentage: '80', sem1Cgpa: '7.86', sem2Cgpa: '7.86', overallCgpa: '7.86', aadhar: '332719675923', quota: 'Management', dob: '11/06/2007', religion: 'Hindu', community: 'BC', address: 'C-37 venkatraman salai periyar nagar chennai -82', fatherName: 'Sugumar P', fatherOccupation: 'Private', fatherMobile: '8056286118', motherName: 'Asha S', motherOccupation: 'private', motherMobile: '8056286180', siblingDetails: 'Yoshika S' },
    { regNumber: '310624243033', name: 'DANISH VASANTH T', gender: 'MALE', studentEmail: 'danishvasanth@gmail.com', officialEmail: '310624243033@eec.srmrmp.edu.in', studentMobile: '9840750128', tenthPercentage: '86.8', twelfthPercentage: '91.33', sem1Cgpa: '8.2', sem2Cgpa: '7.9', overallCgpa: '8.05', aadhar: '534656716324', quota: 'Government', dob: '25/04/2007', religion: 'Hindu', community: 'MBC', address: '100,Meenakshipettai,Adaam Street,Royapuram,chennai-600013', fatherName: 'Thirunavukarasu S', fatherOccupation: 'Business', fatherMobile: '8754704083', motherName: 'Saranya T', motherOccupation: 'House maker', motherMobile: '8838077838', siblingDetails: 'Prithika T' },
    { regNumber: '310624243034', name: 'DARSHAN JR', gender: 'MALE', studentEmail: 'darshanjayapal@gmail.com', officialEmail: '310624243034@eec.srmrmp.edu.in', studentMobile: '8610206161', tenthPercentage: '60.6', twelfthPercentage: '61', sem1Cgpa: '6.5', sem2Cgpa: '6.9', overallCgpa: '6.7', aadhar: '210189395804', quota: 'Management', dob: '11/03/2006', religion: 'Hindu', community: 'MBC', address: '3A green peace apartment no 102 kamarajar salai ramapuram', fatherName: 'R jayapaul', fatherOccupation: 'business', fatherMobile: '9840032228', motherName: 'M RAJALAKSHMI', motherOccupation: 'Housewife', motherMobile: '8680071200', siblingDetails: 'Deeksha JR' },
    { regNumber: '310624243035', name: 'DEEPAK J U', gender: 'MALE', studentEmail: 'judeepak28@gmail.com', officialEmail: '310624243035@eec.srmrmp.edu.in', studentMobile: '8939625517', tenthPercentage: '88.2', twelfthPercentage: '81.2', sem1Cgpa: '8.36', sem2Cgpa: '8.04', overallCgpa: '8.2', aadhar: '394174448041', quota: 'Management', dob: '28-02-2006', religion: 'Hindu', community: 'BC', address: 'No:50 B, Senai Thalaivar Nagar, Madhanankuppam,Kolathur,Chennai-99', fatherName: 'J Jagannathan', fatherOccupation: 'Private Sector', fatherMobile: '8939541940', motherName: 'Umadhevi R', motherOccupation: 'Business', motherMobile: '9884566865', siblingDetails: 'Nil' },
    { regNumber: '310624243036', name: 'DEEPAKRAM V', gender: 'MALE', studentEmail: 'deepakveeramuthu2007@gmail.com', officialEmail: '310624243036@eec.srmrmp.edu.in', studentMobile: '7904038087', tenthPercentage: '87.40%', twelfthPercentage: '72%', sem1Cgpa: '7', sem2Cgpa: '7.62', overallCgpa: '7.31', aadhar: '290468414502', quota: 'Management', dob: '23-01-2007', religion: 'Hindu', community: 'MBC', address: '1/30-A , kooduthurai,paramathivelur tk,namakkal dt-638182', fatherName: 'Veeramuthu S', fatherOccupation: 'Business , Farmer', fatherMobile: '9047429647', motherName: 'Sivarani V', motherOccupation: 'House maker', motherMobile: '9566739647', siblingDetails: 'Dhivya V' },
    { regNumber: '310624243037', name: 'DEVIKA A', gender: 'FEMALE', studentEmail: 'devikaananthakumar06@gmail.com', officialEmail: '310624243037@eec.srmrmp.edu.in', studentMobile: '6383010275', tenthPercentage: '89.80%', twelfthPercentage: '87.50%', sem1Cgpa: '8.18', sem2Cgpa: '8.57', overallCgpa: '8.375', aadhar: '811985441729', quota: 'Government', dob: '18-10-2006', religion: 'Hindu', community: 'BC', address: 'No: 280, J.J. Nagar, Korukkupet, Chennai- 600021.', fatherName: 'Anantha Kumar S', fatherOccupation: 'Provision store', fatherMobile: '8220133107', motherName: 'Chandrika A', motherOccupation: 'Home maker', motherMobile: '9043320275', siblingDetails: 'Vishwa A' },
    { regNumber: '310624243038', name: 'DEVIKA .V', gender: 'FEMALE', studentEmail: 'devikavelan2006@gmail.com', officialEmail: '310624243038@eec.srmrmp.edu.in', studentMobile: '9342936683', tenthPercentage: 'All pass', twelfthPercentage: '90.50%', sem1Cgpa: '8.32', sem2Cgpa: '8.57', overallCgpa: '8.44', aadhar: '780341591999', quota: 'Government', dob: '07-05-2006', religion: 'Hindu', community: 'MBC', address: 'No.62 ,Panchayat Board Street ,Valavanur,Vilupuram -605108', fatherName: 'Velan.M', fatherOccupation: 'Supervisor', fatherMobile: '6380795928', motherName: 'Sathiya .V', motherOccupation: 'Home maker', motherMobile: '8098526947', siblingDetails: 'Dharani Balan.V' },
    { regNumber: '310624243039', name: 'DHANAVARDHINI S', gender: 'FEMALE', studentEmail: 'dhanavardhini26@gmail.com', officialEmail: '310624243039@eec.srmrmp.edu.in', studentMobile: '9840512824', tenthPercentage: '86%', twelfthPercentage: '75%', sem1Cgpa: '7.91', sem2Cgpa: '7.7', overallCgpa: '7.8', aadhar: '272207716882', quota: 'Management', dob: '26-12-2006', religion: 'Hindu', community: 'MBC', address: '50-B, venkatesh nagar main road ,virugambakkam, chennai 92', fatherName: 'Sathish Kumar S', fatherOccupation: 'Manager', fatherMobile: '9840511788', motherName: 'Kavitha', motherOccupation: 'Home Maker', motherMobile: '9840589994', siblingDetails: 'Jaishnu vardhini S' },
    { regNumber: '310624243040', name: 'DHEEKSHITH.R', gender: 'MALE', studentEmail: 'rdheekshith@gmail.com', officialEmail: '310624243040@eec.srmrmp.edu.in', studentMobile: '7845651662', tenthPercentage: '72%', twelfthPercentage: '72.16%', sem1Cgpa: '7.32', sem2Cgpa: '6.48', overallCgpa: '6.91', aadhar: '512721178396', quota: 'Management', dob: '05-01-2006', religion: 'Hindu', community: 'BC', address: 'No.6 Narmada street, Surya Naga, Minjur -601203', fatherName: 'Raghu.S', fatherOccupation: 'Business', fatherMobile: '9940264545', motherName: 'Arathy K J', motherOccupation: 'Home maker', motherMobile: '9791138931', siblingDetails: 'Hashwanth R' },
    { regNumber: '310624243041', name: 'DIKSHITHA.J', gender: 'FEMALE', studentEmail: 'dikshithaj2007@gmail.com', officialEmail: '310624243041@eec.srmrmp.edu.in', studentMobile: '7358413795', tenthPercentage: '71%', twelfthPercentage: '73%', sem1Cgpa: '8', sem2Cgpa: '7.8', overallCgpa: '7.9', aadhar: '932299952885', quota: 'Management', dob: '03/05/2007', religion: 'Hindu', community: 'BC', address: 'E residence d block flat no 202 club house road, anna salai Chennai -600002', fatherName: 'Jai Ganesh.S', fatherOccupation: 'Business', fatherMobile: '9841235686', motherName: 'Sangeetha.J', motherOccupation: 'Home maker', motherMobile: '9710048282', siblingDetails: 'Yeshmit S J' },
    { regNumber: '310624243042', name: 'DIKSHITHA VISALI Y', gender: 'FEMALE', studentEmail: 'dikshithavisaliy@gmail.com', officialEmail: '310624243042@eec.srmrmp.edu.in', studentMobile: '6382221377', tenthPercentage: '92.4', twelfthPercentage: '91.8', sem1Cgpa: '8.86', sem2Cgpa: '8.95', overallCgpa: '8.9', aadhar: '527411955295', quota: 'Government', dob: '16-10-2006', religion: 'Hindu', community: 'OC', address: 'No.45/3 ,G2 , Hebron Enclave ,Sivan Kovil Street , Kodambakkam , Chennai-24', fatherName: 'Y Prabhakaran', fatherOccupation: 'Private Sector', fatherMobile: '8825747516', motherName: 'Y Malathi', motherOccupation: 'Home Maker', motherMobile: '8610909816', siblingDetails: 'Nil' },
    { regNumber: '310624243043', name: 'DIVAKARAN P', gender: 'MALE', studentEmail: 'divakarpalani73@gmail.com', officialEmail: '310624243043@eec.srmrmp.edu.in', studentMobile: '7305688434', tenthPercentage: '64%', twelfthPercentage: '65%', sem1Cgpa: '7.91', sem2Cgpa: '7.8', overallCgpa: '7.85', aadhar: '896197576767', quota: 'management', dob: '26-09-2006', religion: 'Hindu', community: 'BC', address: '141/151, periyar pathai,choolaimedu,chennai 600094', fatherName: 'N Palani', fatherOccupation: 'business', fatherMobile: '9444287211', motherName: 'P Sumathi', motherOccupation: 'house wife', motherMobile: '9171123441', siblingDetails: 'subhathra' },
    { regNumber: '310624243044', name: 'DIVESH N', gender: 'MALE', studentEmail: 'diveshn2007@gmail.com', officialEmail: '310624243044@eec.srmrmp.edu.in', studentMobile: '9566233743', tenthPercentage: '84%', twelfthPercentage: '83%', sem1Cgpa: '8', sem2Cgpa: '8.24', overallCgpa: '8.12', aadhar: '905345622249', quota: 'MANAGEMENT', dob: '23-05-2007', religion: 'HINDU', community: 'MBC', address: 'No.28,F1,2nd Cross Street,Maxworth Nagar, Phase-2,Kolapakkam', fatherName: 'Nainiappan M', fatherOccupation: 'Business', fatherMobile: '9941404866', motherName: 'Gandhimathi N', motherOccupation: 'House Wife', motherMobile: '8754421226', siblingDetails: 'Prakash' },
    { regNumber: '310624243045', name: 'ELAKKIYA S', gender: 'FEMALE', studentEmail: 'stsubraja@gmail.com', officialEmail: '310624243045@eec.srmrmp.edu.in', studentMobile: '9025064150', tenthPercentage: '92%', twelfthPercentage: '85.60%', sem1Cgpa: '7.91', sem2Cgpa: '7.86', overallCgpa: '7.88', aadhar: '375650687562', quota: 'Government', dob: '28-09-2006', religion: 'Hindu', community: 'BC', address: 'Hansa Bellissimo Apartments, 86/87 Door no: 12, 4th floor, 2B East, Erukkancherry, Chennai -118', fatherName: 'Srinivasan S', fatherOccupation: 'Business', fatherMobile: '9840101391', motherName: 'Thilagavathi S', motherOccupation: 'Home Maker', motherMobile: '9150002747', siblingDetails: 'Janani Sri S, Hananiya Sri S' },
    { regNumber: '310624243046', name: 'GEETHA SRI S', gender: 'FEMALE', studentEmail: 'geetha132007@gmail.com', officialEmail: '310624243046@eec.srmrmp.edu.in', studentMobile: '8925707084', tenthPercentage: '95.40%', twelfthPercentage: '88.66%', sem1Cgpa: '8.59', sem2Cgpa: '8.71', overallCgpa: '8.65', aadhar: '969513348838', quota: 'Government', dob: '13-04-2007', religion: 'HINDU', community: 'BC', address: 'No:20/787 pillaiyar koil street, keelmanambedu, Chennai-600124', fatherName: 'Srinivasan M', fatherOccupation: 'Business', fatherMobile: '9094974512', motherName: 'Bhavani S', motherOccupation: 'home maker', motherMobile: '9489244512', siblingDetails: 'Kumara vel S' },
    { regNumber: '310624243047', name: 'GURU PRASATH B', gender: 'MALE', studentEmail: 'guruprasathbalaji@gmail.com', officialEmail: '310624243047@eec.srmrmp.edu.in', studentMobile: '9600841086', tenthPercentage: '70.10%', twelfthPercentage: '81.10%', sem1Cgpa: '7.82', sem2Cgpa: '7.76', overallCgpa: '7.79', aadhar: '594602528983', quota: 'management', dob: '10-08-2006', religion: 'HINDU', community: 'BC', address: 'no:2/3 BALANI KOIL 1ST STREET, CHOOLAIMEDU, CHENNAI-94', fatherName: 'BALAJI V', fatherOccupation: 'Business', fatherMobile: '7395972679', motherName: 'Komala B', motherOccupation: 'Home maker', motherMobile: '9952075276', siblingDetails: 'Bharathy B' },
    { regNumber: '310624243048', name: 'HARI KISHORE P', gender: 'MALE', studentEmail: 'yogeshhari815@gmail.com', officialEmail: '310624243048@eec.srmrmp.edu.in', studentMobile: '9025584368', tenthPercentage: '75%', twelfthPercentage: '77.80%', sem1Cgpa: '7.86', sem2Cgpa: '8.14', overallCgpa: '8', aadhar: '994260915119', quota: 'Management', dob: '8-12-2006', religion: 'Hindu', community: 'MBC', address: '127-B,16th street Krishna Nagar alapakkam Maduravoyal Chennai-95.', fatherName: 'C Panneer Selvam', fatherOccupation: 'Auditor', fatherMobile: '9841443168', motherName: 'P Kotteswari', motherOccupation: 'Home Maker', motherMobile: '8248790757', siblingDetails: 'P.a.Yogesh' },
    { regNumber: '310624243049', name: 'HARI KRISHNA.B', gender: 'MALE', studentEmail: 'harikrishna240407@gmail.com', officialEmail: '310624243049@eec.srmrmp.edu.in', studentMobile: '7418792602', tenthPercentage: '80%', twelfthPercentage: '74%', sem1Cgpa: '7.4', sem2Cgpa: '7.5', overallCgpa: '7.45', aadhar: '506683338393', quota: 'Management', dob: '24-04-2007', religion: 'Hindu', community: 'BC', address: 'plot no-1,19 th Street, sivasakthi nagar,b-sector,annanur, chennai -600109', fatherName: 'Babu.T', fatherOccupation: 'private sector', fatherMobile: '9444207619', motherName: 'Rajeswari', motherOccupation: 'Home maker', motherMobile: '9962997619', siblingDetails: 'Vignesh' },
    { regNumber: '310624243050', name: 'HARIHARAN .K', gender: 'MALE', studentEmail: 'khariharan2304@gmail.com', officialEmail: '310624243050@eec.srmrmp.edu.in', studentMobile: '6383775148', tenthPercentage: '92.5', twelfthPercentage: '90', sem1Cgpa: '8.54', sem2Cgpa: '8.48', overallCgpa: '8.42', aadhar: '208783723163', quota: 'government', dob: '23-04-2007', religion: 'Hindu', community: 'BC', address: '2/42 west lakshminagar muidchur mainroad chennai -48', fatherName: 'K.V.KUMAR', fatherOccupation: 'private sector', fatherMobile: '9444260257', motherName: 'PREMILA.K', motherOccupation: 'home maker', motherMobile: '9551012759', siblingDetails: '-' },
    { regNumber: '310624243051', name: 'HARINI SRI R', gender: 'FEMALE', studentEmail: 'harsri2610@gmail.com', officialEmail: '310624243051@eec.srmrmp.edu.in', studentMobile: '9884331167', tenthPercentage: '65%', twelfthPercentage: '75%', sem1Cgpa: '7.73', sem2Cgpa: '8.3', overallCgpa: '8', aadhar: '403052231983', quota: 'Management', dob: '03-05-2006', religion: 'Hindu', community: 'MBC', address: '19/37 swamy naicken street, Chintadripet. , Chennai -02', fatherName: 'A Raj Kumar', fatherOccupation: 'Business', fatherMobile: '9884222444', motherName: 'R Kokila', motherOccupation: 'Homemaker', motherMobile: '9790847997', siblingDetails: 'Dr.R.Mogesh Raj' },
    { regNumber: '310624243052', name: 'HARINY S', gender: 'FEMALE', studentEmail: 'harinysanthakumar@gmail.com', officialEmail: '310624243052@eec.srmrmp.edu.in', studentMobile: '7358455899', tenthPercentage: '84%', twelfthPercentage: '77.20%', sem1Cgpa: '7.9', sem2Cgpa: '8.52', overallCgpa: '8.23', aadhar: '324949216463', quota: 'GOVERNMENT', dob: '01-06-2006', religion: 'Hindu', community: 'SC', address: 'No.4/11, 10th Street, K.K.Ngar, Pazhavanthangal, Chennai-114', fatherName: 'D. Santhakumar', fatherOccupation: 'Electrician', fatherMobile: '9840177538', motherName: 'S. Mahalakshmi', motherOccupation: 'Home maker', motherMobile: '9790714134', siblingDetails: 'S. Varshini' },
    { regNumber: '310624243053', name: 'HARISH G', gender: 'MALE', studentEmail: 'harishg2510@gmail.com', officialEmail: '310624243053@eec.srmrmp.edu.in', studentMobile: '8825530712', tenthPercentage: '84%', twelfthPercentage: '86%', sem1Cgpa: '8.2', sem2Cgpa: '7.8', overallCgpa: '8', aadhar: '692347481687', quota: 'government', dob: '25/10/2006', religion: 'hindu', community: 'bc', address: '5, Ayya Mudali street, sowcarpet, chennai -600001', fatherName: 'Gajendran', fatherOccupation: 'Business', fatherMobile: '9841599215', motherName: 'Anitha G', motherOccupation: 'Home Maker', motherMobile: '9841599216', siblingDetails: 'Ashwin G' },
    { regNumber: '310624243054', name: 'HARISH V', gender: 'MALE', studentEmail: 'harish661166@gmail.com', officialEmail: '310624243054@eec.srmrmp.edu.in', studentMobile: '9994696932', tenthPercentage: '83%', twelfthPercentage: '85%', sem1Cgpa: '8.45', sem2Cgpa: '8.24', overallCgpa: '8.34', aadhar: '941944630625', quota: 'Government', dob: '03-05-2007', religion: 'Hindu', community: 'Mbc', address: 'No. 09 muniyapa street , Kondhithope , george town chennai 01', fatherName: 'K. Vijayakumar', fatherOccupation: 'Business', fatherMobile: '9444136408', motherName: 'Kumutha. V', motherOccupation: 'Home Maker', motherMobile: '9445487110', siblingDetails: 'V. Sri harini' },
    { regNumber: '310624243055', name: 'HARSHIDHA.R', gender: 'FEMALE', studentEmail: 'lakshmiravindran938@gmail.com', officialEmail: '310624243055@eec.srmrmp.edu.in', studentMobile: '7358531010', tenthPercentage: '91%', twelfthPercentage: '75', sem1Cgpa: '7.91', sem2Cgpa: '7.4', overallCgpa: '7.8', aadhar: '722484865351', quota: 'Management', dob: '04-01-2007', religion: 'Hindu', community: 'Bc', address: 'No:4,2nd cross street,east mada veethi ,thirumullaivoyal,chennai-62', fatherName: 'Ravindran.E', fatherOccupation: 'Business', fatherMobile: '9344090537', motherName: 'Sivabaghyalakshmi', motherOccupation: 'Home maker', motherMobile: '9884331040', siblingDetails: 'Jaishree nivedha' },
    { regNumber: '310624243606', name: 'T MONISH RAGAV', gender: 'MALE', studentEmail: 'monishragav237@gmail.com', officialEmail: '310624243606@eec.srmrmp.edu.in', studentMobile: '7358625303', tenthPercentage: '77%', twelfthPercentage: '79', sem1Cgpa: 'nil', sem2Cgpa: 'nil', overallCgpa: 'nil', aadhar: '328345742927', quota: 'Management', dob: '14-02-2006', religion: 'Hindu', community: 'Mbc', address: 'Sekar Flat, Raza Hyder St, Border Thottam, Padupakkam, Triplicane, Chenai', fatherName: 'P THAVAMANI', fatherOccupation: 'Business', fatherMobile: '9865957190', motherName: 'S JAYANTHI', motherOccupation: 'TEACHER', motherMobile: '9865957190', siblingDetails: '-' },
    { regNumber: '310624243701', name: 'KR.HARITHA', gender: 'FEMALE', studentEmail: 'krharithaaids@gmail.com', officialEmail: '310624243071@eec.srmrmp.edu.in', studentMobile: '7540048721', tenthPercentage: '94', twelfthPercentage: '95', sem1Cgpa: '7.9', sem2Cgpa: '8.3', overallCgpa: '8.2', aadhar: '794725044701', quota: 'managememt', dob: '27-06-2006', religion: 'hindu', community: 'oc', address: 'door no L406,sri ram gargen ,indira nagar ,casagrand utopia,manappakam ,chennai-45', fatherName: 'ck.raajaraman', fatherOccupation: 'private sector', fatherMobile: '9840948721', motherName: 'R.ABARNA', motherOccupation: 'Home Maker', motherMobile: '9840989495', siblingDetails: 'R.rithvik' },
    { regNumber: '310624243613', name: 'THARUN RAJ M', gender: 'MALE', studentEmail: 'mmtharun823@gmail.com', officialEmail: '310624243613@eec.srmrmp.edu.in', studentMobile: '6369814682', tenthPercentage: '49%', twelfthPercentage: '73%', sem1Cgpa: '-', sem2Cgpa: '-', overallCgpa: '-', aadhar: '644326444311', quota: 'Government', dob: '03-08-2007', religion: 'Hindu', community: 'MBC', address: 'NO:46/3,1st FLOOR, 2nd AVENUE, NEHRU NAGAR, ANNA NAGAR, CH-40.', fatherName: 'S. Mohana Sundaram', fatherOccupation: 'driver', fatherMobile: '-', motherName: 'M. KAVITHA', motherOccupation: 'Teacher', motherMobile: '9962791880', siblingDetails: 'SAI SAJIN M' }
];


const studentDetailsMap = new Map(STUDENT_DETAILS.map(s => [s.regNumber, s]));

export const STUDENTS: Student[] = studentDataList.map((s, index) => {
    const details = studentDetailsMap.get(s.rollNumber);
    return {
        id: `stu-${s.rollNumber}`,
        name: s.name,
        rollNumber: s.rollNumber,
        parentPhoneNumber: parentPhoneNumbers[index] || 'Not Available',
        ...details,
    };
});

const studentUsers: User[] = studentDataList.map(s => ({
    id: `user-stu-${s.rollNumber}`,
    name: s.name,
    role: UserRole.Student,
    username: s.rollNumber,
    password: s.rollNumber,
}));

export const SUBJECTS: Subject[] = [
    { id: 'sub-dm', name: 'Discrete Mathematics' },
    { id: 'sub-cn', name: 'Computer Networks' },
    { id: 'sub-dsa', name: 'Data Structures and Algorithms' },
    { id: 'sub-foaiml', name: 'Fundamentals of Artificial Intelligence and Machine Learning' },
    { id: 'sub-dpco', name: 'Digital Principles and Computer Organization' },
    { id: 'sub-oops', name: 'Object Oriented Programming using Java' },
    { id: 'sub-csd', name: 'Career Skill Development - i' },
    { id: 'sub-at', name: 'Aptitude Test' },
    { id: 'sub-tt', name: 'Technical Test' },
    { id: 'sub-lib', name: 'Library' },
    { id: 'sub-coun', name: 'Counselling' },
];

const teacherUsers: User[] = SUBJECTS.map((subject, index) => {
    const subjectName = subject.name;
    const username = subjectName.replace(/\s/g, '').toLowerCase();
    const password = username + '@eec';
    return {
        id: `user-teach-${index + 1}`,
        name: `${subjectName} Faculty`,
        role: UserRole.Teacher,
        username: `${username}_faculty`,
        password: password,
    };
});

export const USERS: User[] = [
  { id: 'user-0', name: 'Mr. Smith', role: UserRole.Admin, username: 'admin', password: 'password123' },
  ...teacherUsers,
  ...studentUsers,
];

export const PREDEFINED_OD_REASONS: string[] = [
    'Seminar',
    'Sports Event',
    'College Fest',
    'Workshop',
    'Technical Competition'
];

// Helper to get date string for today and past days
const getDateString = (daysAgo: number = 0): string => {
    const date = new Date();
    date.setDate(date.getDate() - daysAgo);
    return date.toISOString().split('T')[0];
};

export const INITIAL_ATTENDANCE: AttendanceRecord[] = [
    // Today's Data
    ...STUDENTS.slice(0, 8).map((student, index) => ({
        id: `att-${index}`,
        studentId: student.id,
        subjectId: 'sub-dsa',
        date: getDateString(0),
        status: index === 2 ? AttendanceStatus.Absent : (index === 3 ? AttendanceStatus.OD : AttendanceStatus.Present),
        ...(index === 3 && { odReason: 'Seminar' })
    })),
    
    // Yesterday's Data
    ...STUDENTS.map((student, index) => ({
        id: `att-y${index}`,
        studentId: student.id,
        subjectId: 'sub-cn',
        date: getDateString(1),
        status: index % 4 === 0 ? AttendanceStatus.Absent : AttendanceStatus.Present
    })),

     // More historical data for reports
    ...STUDENTS.flatMap((student, s_idx) => 
        SUBJECTS.flatMap((subject, sub_idx) => 
            Array.from({length: 10}).map((_, day_idx) => ({
                id: `att-hist-${s_idx}-${sub_idx}-${day_idx}`,
                studentId: student.id,
                subjectId: subject.id,
                date: getDateString(day_idx + 2),
                status: Math.random() > 0.1 ? AttendanceStatus.Present : Math.random() > 0.5 ? AttendanceStatus.Absent : AttendanceStatus.OD
            }))
        )
    )
];


export const INITIAL_LEAVE_REQUESTS: LeaveRequest[] = [
    { id: 'leave-1', studentId: STUDENTS[3]?.id || 'stu-1', startDate: getDateString(0), endDate: getDateString(0), reason: 'Attending Seminar', status: LeaveStatus.Approved, isOd: true },
    { id: 'leave-2', studentId: STUDENTS[5]?.id || 'stu-2', startDate: getDateString(2), endDate: getDateString(1), reason: 'Family function', status: LeaveStatus.Pending, isOd: false },
    { id: 'leave-3', studentId: STUDENTS[1]?.id || 'stu-3', startDate: getDateString(5), endDate: getDateString(3), reason: 'Medical reasons', status: LeaveStatus.Approved, isOd: false },
    { id: 'leave-4', studentId: STUDENTS[7]?.id || 'stu-4', startDate: getDateString(1), endDate: getDateString(1), reason: 'College Sports Event', status: LeaveStatus.Rejected, isOd: true },
];

export const DAYS_OF_WEEK: DayOfWeek[] = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

export const TIMETABLE: TimetableEntry[] = [
  // Monday
  { day: 'Monday', period: 1, subjectId: 'sub-dm' },
  { day: 'Monday', period: 2, subjectId: 'sub-dsa' },
  { day: 'Monday', period: 3, subjectId: 'sub-foaiml' },
  { day: 'Monday', period: 4, subjectId: 'sub-csd' },
  { day: 'Monday', period: 6, subjectId: 'sub-foaiml' },
  { day: 'Monday', period: 8, subjectId: 'sub-dpco' },
  // Tuesday
  { day: 'Tuesday', period: 1, subjectId: 'sub-at' },
  { day: 'Tuesday', period: 2, subjectId: 'sub-oops' },
  { day: 'Tuesday', period: 3, subjectId: 'sub-dpco' },
  { day: 'Tuesday', period: 4, subjectId: 'sub-dsa' },
  { day: 'Tuesday', period: 5, subjectId: 'sub-dpco' },
  { day: 'Tuesday', period: 6, subjectId: 'sub-lib' },
  { day: 'Tuesday', period: 7, subjectId: 'sub-oops' },
  // Wednesday
  { day: 'Wednesday', period: 1, subjectId: 'sub-dsa' },
  { day: 'Wednesday', period: 2, subjectId: 'sub-dm' },
  { day: 'Wednesday', period: 3, subjectId: 'sub-cn' },
  { day: 'Wednesday', period: 4, subjectId: 'sub-dsa' },
  { day: 'Wednesday', period: 6, subjectId: 'sub-dm' },
  { day: 'Wednesday', period: 7, subjectId: 'sub-oops' },
  { day: 'Wednesday', period: 8, subjectId: 'sub-coun' },
  // Thursday
  { day: 'Thursday', period: 1, subjectId: 'sub-tt' },
  { day: 'Thursday', period: 2, subjectId: 'sub-dpco' },
  { day: 'Thursday', period: 3, subjectId: 'sub-oops' },
  { day: 'Thursday', period: 4, subjectId: 'sub-cn' },
  { day: 'Thursday', period: 5, subjectId: 'sub-dm' },
  { day: 'Thursday', period: 6, subjectId: 'sub-foaiml' },
  { day: 'Thursday', period: 7, subjectId: 'sub-dsa' },
  { day: 'Thursday', period: 8, subjectId: 'sub-dm' },
  // Friday
  { day: 'Friday', period: 1, subjectId: 'sub-foaiml' },
  { day: 'Friday', period: 2, subjectId: 'sub-cn' },
  { day: 'Friday', period: 3, subjectId: 'sub-cn' },
  { day: 'Friday', period: 4, subjectId: 'sub-oops' },
  { day: 'Friday', period: 6, subjectId: 'sub-dpco' },
  { day: 'Friday', period: 7, subjectId: 'sub-foaiml' },
];