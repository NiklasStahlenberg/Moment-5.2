let url = "http://localhost/2/webbutveckling%20III/moment%205/api.php";

window.onload = function(){
    //get data from api on load
    this.getCourses();
}

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