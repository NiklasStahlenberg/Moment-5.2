let url = "http://localhost/2/webbutveckling%20III/moment%205/api.php";

window.onload = function(){
    //get data from api on load
    this.getCourses();
}

//event-listener for form submit
document.getElementById("formBtn").addEventListener('click', addCourse);

//get courses and put them in a table
function getCourses() {
    fetch(url)
        .then((res) => res.json())
        .then((data) => {           
           let output = "";
           
           data.forEach(function(course){
               output +=`
               <tr>               
                <td class='courseitems'>${course.coursecode}</td>
                <td class='courseitems'>${course.coursename}</td>
                <td class='courseitems'>${course.progression}</td>
                <td class='courseitems'><a href = '${course.courseinfo}' target = _blank>Info</td> 
               </tr>                
               `;
           })
           document.getElementById("output").innerHTML += output; 
        })          
}

//add course to database
function addCourse(){    
    let errorMsg = "";
    let errorOutput = document.getElementById("errorMsg");

    let coursecode = document.getElementById("coursecode").value;
    let coursename = document.getElementById("coursename").value;
    let progression = document.getElementById("progression").value;
    let courseinfo = document.getElementById("courseinfo").value;

    //check variables for null or empty
    if(nullOrEmpty(coursecode) || nullOrEmpty(coursename) || nullOrEmpty(progression) || nullOrEmpty(courseinfo)){
        errorMsg = "<p>All fields are required</p>";
        errorOutput.innerHTML = errorMsg;
        return;        
    
    //check string length
    }else if(!inputLength(coursecode) || !inputLength(coursename) || !inputLength(courseinfo)){
        errorMsg = "<p>Text must be longer than 5 letters</p>";
        errorOutput.innerHTML = errorMsg;
        return;
    }else{
        //add data to database
        let jsonString = JSON.stringify({
            "coursecode": coursecode,
            "coursename": coursename,
            "progression": progression,
            "courseinfo": courseinfo
        });

        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: jsonString 
        }).then((res) => res.json())
        .then((data) => {
            console.log(data);
            location.reload();
            //getCourses();
        })
        .catch((error) => console.log(error))
    }

}

//check for empty string or null values
function nullOrEmpty(string){
    if(string === null || string === ""){
        return true;
    }else{
        return false;
    }
}

//check length of string
function inputLength(string){
    if(string.length > 5){
        return true;
    }else{
        return false;
    }
}