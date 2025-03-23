function createStudentManager(){
    let students={};
    return {
        addStudent(name){
            if(!students[name]){
                students[name]={}
            }
        },
        addSubject(name,subject,score){
            if(students[name]){
                students[name][subject]=score;
            }
        },
        updateScore(name,subject,score){
            if(students[name] && students[name][subject] !==undefined){
                students[name][subject]=score;
            }
        },
        getStudentDetails(name){
            return students[name] ?{name,subject:students[name]} : "Student Not Found";
        },
        getSortedStudents(sortBy){
            return Object.entries(students)
            .map(([name,subjects])=>{
                let scores=Object.values(subjects);
                let avgrageScore=scores.length ? scores.reduce((a,b)=> a+b,0)/scores.length:0;
                return {name,avgrageScore};
            })
            .sort((a,b)=>{
                if(sortBy ==="AverageScore") return b.avgrageScore - a.avgrageScore;
                if(sortBy==="name")return a.name.localeCompare(b.name);
            })
        },
        Generatescores(){
            let generats={
                avgragescore:{},
                topPerformers:[],
                difficultSubject:{},
                failedStudent:[],
                frequencySubject:{}
            };
            let subjectScores={}
            Object.entries(students).forEach(([name,subjects])=>{
                let scores=Object.values(subjects);
                let aveScore=scores.length ? scores.reduce((a,b)=> a+b,0)/scores.length : 0;
                generats.avgragescore[name]=aveScore;
                if(aveScore > 85) generats.topPerformers.push(name);
                let hasFailed=Object.values(subjects).some(score =>score < 35);
                if(hasFailed) generats.failedStudent.push(name);
                Object.entries(subjects).forEach(([subject,score])=>{
                    subjectScores[subject]=subjectScores[subject] || [];
                    subjectScores[subject].push(score);
                    generats.frequencySubject[subject]=(generats.frequencySubject[subject] || 0)+1;

                })
            })
            Object.entries(subjectScores).forEach(([subject,scores])=>{
                let failCount=scores.filter(scores => scores).length;
                if(failCount > scores.length/2){
                    generats.difficultSubject[subject]=failCount;
                }
            });
            return generats;
        }
    }
}
const StudentManager=createStudentManager();
StudentManager.addStudent("raju")
StudentManager.addSubject("raju","English",92)
StudentManager.addSubject("raju","telugu",70)

StudentManager.addStudent("pavan")
StudentManager.addSubject("pavan","Science",32)
StudentManager.addSubject("pavan","Maths",67)
StudentManager.updateScore("pavan","Science",68);

console.log(StudentManager.getStudentDetails("raju"));
console.log(StudentManager.getSortedStudents("averageScores"))
console.log(StudentManager.Generatescores());