export const SEMESTERS = [
  { id:"1.1", label:"1.1", level:1, term:1, name:"First Semester", ordinal:"1st", courses:[
    { code:"CSE 113", title:"Discrete Mathematics", credit:3 },
    { code:"CSE 112", title:"Introduction to Computing Sessional", credit:1.5 },
    { code:"CHEM 111", title:"Chemistry", credit:3 },
    { code:"CHEM 112", title:"Chemistry Sessional", credit:1 },
    { code:"MATH 111", title:"MATH I (Differential Calculus, Integral Calculus and Matrix)", credit:3 },
    { code:"EEE 112", title:"Electrical Circuit Analysis Sessional", credit:1.5 },
    { code:"ENG 111", title:"English Reading and Speaking", credit:2 },
    { code:"EEE 111", title:"Electrical Circuit Analysis", credit:3 },
  ]},
  { id:"1.2", label:"1.2", level:1, term:2, name:"Second Semester", ordinal:"2nd", courses:[
    { code:"CSE 121", title:"Structured Programming Language", credit:3 },
    { code:"CSE 122", title:"Structured Programming Language Sessional", credit:1.5 },
    { code:"GED 121", title:"History of the Emergence of Bangladesh", credit:2 },
    { code:"ENG 121", title:"English Writing and Listening", credit:3 },
    { code:"MATH 121", title:"MATH II (Vector Analysis, Linear Algebra, Coordinate Geometry and Fourier Analysis)", credit:3 },
    { code:"EEE 121", title:"Electronic Devices and Circuits", credit:3 },
    { code:"EEE 122", title:"Electronic Devices and Circuits Sessional", credit:1.5 },
    { code:"PHY 121", title:"Physics I", credit:3 },
    { code:"PHY 124", title:"Basic Physics Sessional", credit:1 },
  ]},
  { id:"2.1", label:"2.1", level:2, term:1, name:"Third Semester", ordinal:"3rd", courses:[
    { code:"CSE 211", title:"Data Structures", credit:3 },
    { code:"CSE 212", title:"Data Structures Sessional", credit:1.5 },
    { code:"CSE 213", title:"Object Oriented Programming Language", credit:3 },
    { code:"CSE 214", title:"Object Oriented Programming Language Sessional", credit:1.5 },
    { code:"MATH 211", title:"MATH III (Differential Equations, Complex Variables and Laplace Transforms)", credit:3 },
    { code:"PHY 211", title:"Physics II", credit:3 },
    { code:"HUM 211", title:"Bangla Language", credit:2 },
    { code:"GED 211", title:"Finance and Investment", credit:3 },
  ]},
  { id:"2.2", label:"2.2", level:2, term:2, name:"Fourth Semester", ordinal:"4th", courses:[
    { code:"CSE 221", title:"Computer Algorithms and Complexity", credit:3 },
    { code:"CSE 222", title:"Computer Algorithms and Complexity Sessional", credit:1.5 },
    { code:"CSE 223", title:"Digital Logic Design", credit:3 },
    { code:"CSE 224", title:"Digital Logic Design Sessional", credit:1.5 },
    { code:"CSE 225", title:"Numerical Methods", credit:3 },
    { code:"CSE 226", title:"Numerical Methods Sessional", credit:1 },
    { code:"MATH 221", title:"MATH IV (Probability and Statistics)", credit:3 },
    { code:"GED 221", title:"Engineering Economics", credit:3 },
  ]},
  { id:"3.1", label:"3.1", level:3, term:1, name:"Fifth Semester", ordinal:"5th", courses:[
    { code:"CSE 311", title:"Operating System", credit:3 },
    { code:"CSE 312", title:"Operating System Sessional", credit:1 },
    { code:"CSE 313", title:"Database Management System", credit:3 },
    { code:"CSE 314", title:"Database Management System Sessional", credit:1.5 },
    { code:"CSE 315", title:"Computer Architecture and Design", credit:3 },
    { code:"CSE 317", title:"Software Engineering and Design Patterns", credit:3 },
    { code:"CSE 318", title:"Software Engineering and Design Patterns Sessional", credit:1 },
    { code:"CSE 319", title:"Theory of Computation", credit:3 },
    { code:"CE 311", title:"Engineering Drawing", credit:1 },
    { code:"CE 312", title:"Engineering Drawing and CAD Sessional", credit:1 },
  ]},
  { id:"3.2", label:"3.2", level:3, term:2, name:"Sixth Semester", ordinal:"6th", courses:[
    { code:"CSE 321", title:"Data Communications", credit:3 },
    { code:"CSE 322", title:"Data Communications Sessional", credit:1 },
    { code:"CSE 323", title:"Web Technologies", credit:2 },
    { code:"CSE 324", title:"Web Technologies Sessional", credit:1.5 },
    { code:"CSE 325", title:"Microprocessor, Assembly Language and Computer Interfacing", credit:3 },
    { code:"CSE 326", title:"Microprocessor, Assembly Language and Computer Interfacing Sessional", credit:1.5 },
    { code:"CSE 327", title:"Computer Networks", credit:3 },
    { code:"CSE 328", title:"Computer Networks Sessional", credit:1.5 },
    { code:"CSE 301", title:"Integrated Design Project", credit:2 },
    { code:"CSE 329", title:"Management Information System", credit:2 },
  ]},
  { id:"4.1", label:"4.1", level:4, term:1, name:"Seventh Semester", ordinal:"7th", courses:[
    { code:"CSE 411", title:"Machine Learning", credit:2 },
    { code:"CSE 412", title:"Machine Learning Sessional", credit:1 },
    { code:"CSE 413", title:"Compiler Design and Construction", credit:3 },
    { code:"CSE 414", title:"Compiler Design and Construction Sessional", credit:1 },
    { code:"CSE 415", title:"Research Methodology and Complex Engineering Activities", credit:2 },
    { code:"GED 411", title:"Business Communications", credit:3 },
    { code:"CSE 401", title:"Capstone Project (Part-1)", credit:2 },
  ]},
  { id:"4.2", label:"4.2", level:4, term:2, name:"Eighth Semester", ordinal:"8th", courses:[
    { code:"CSE 421", title:"Artificial Intelligence", credit:3 },
    { code:"CSE 422", title:"Artificial Intelligence Sessional", credit:1 },
    { code:"GED 421", title:"Sociology for Engineers", credit:2 },
    { code:"GED 423", title:"Engineering Ethics", credit:2 },
    { code:"CSE 402", title:"Capstone Project (Part-2)", credit:4 },
  ]},
];

export const getCourseIcon = (code, title) => {
  const t = title.toLowerCase();
  if (t.includes("data struct")) return "binary-tree";
  if (t.includes("algorithm")) return "route";
  if (t.includes("object") || t.includes("oop")) return "code";
  if (t.includes("database") || t.includes("dbms")) return "database";
  if (t.includes("operating sys")) return "cpu";
  if (t.includes("network")) return "network";
  if (t.includes("machine learning")) return "brain";
  if (t.includes("artificial intel")) return "robot";
  if (t.includes("web tech")) return "world-www";
  if (t.includes("compiler")) return "terminal-2";
  if (t.includes("computer arch")) return "circuit-board";
  if (t.includes("software eng")) return "git-branch";
  if (t.includes("discrete")) return "math";
  if (t.includes("math") || t.includes("calculus") || t.includes("statistics")) return "calculator";
  if (t.includes("physics")) return "atom";
  if (t.includes("chemistry")) return "flask";
  if (t.includes("electric")) return "bolt";
  if (t.includes("english")) return "language";
  if (t.includes("bangla") || t.includes("humanities")) return "book";
  if (t.includes("drawing") || t.includes("cad")) return "pencil-ruler";
  if (t.includes("communic") || t.includes("data comm")) return "antenna";
  if (t.includes("microproc") || t.includes("assembly")) return "cpu-2";
  if (t.includes("capstone")) return "award";
  if (t.includes("research")) return "microscope";
  if (t.includes("sessional")) return "tool";
  if (t.includes("project")) return "layout-project";
  if (t.includes("economics") || t.includes("finance") || t.includes("business")) return "chart-bar";
  if (t.includes("sociology") || t.includes("ethics")) return "users";
  if (t.includes("management") || t.includes("mis")) return "chart-dots";
  if (t.includes("numerical")) return "variable";
  if (t.includes("theory of comp")) return "omega";
  return "book-2";
};
