var courseApi = 'http://localhost:3000/courses'
const $ = document.querySelector.bind(document)
const $$ = document.querySelectorAll.bind(document)
var listCoursesBlock = $("#list-coursres")
var creatBtn = $("#creat")

//=============================
start()

function start() {

    getCourses(courses => {
        console.log(courses)
        renderCourses(courses)
    })
    handleCreatCourse()

}



function getCourses(callback) {
    fetch(courseApi)
        // fetch  là một Promise
        // Nếu thực hiện thành công trả về đối tượng response
        // response.json()-> trả về một Promise
        // Chuyển đổi data từ dạng json sang dạng js
        .then((response) => {
            return response.json()
        })
        .then(callback)
        .catch(() => {
            console.log("Co loi xay ra vui long lien he quan tri vien")
        })
}

function renderCourses(courses) {
    let htmls = courses.map((element) => {
        return `
                
                <li class="course-item-${element.id} col-lg-3 d-flex flex-column justify-content-between">
                <div class="course__item-box">
                <div class="content mb-5 ">
                <img src="${element.src}" alt="" class="img-responsive src-${element.id}">
                <h4 class="name-${element.id} text-center">${element.name}</h4>
                <p class="description-${element.id}">${element.description}</p>
               <strong>Teacher:</strong><span class="teacher-${element.id}">${element.teacher}</span>
            </div>
            <div class="footer text-center">
                <div class="box__btn d-flex justify-content-around">
                    <a href="#btn" class="btn btn-primary" onclick="handleModifyCourse(${element.id})">Update</a>
                    <a class="btn btn-danger" onclick="handleDeleteCourse(${element.id})">Delete</a>
                </div>
                
                <hr>
                <br>
            </div>
                </div>
               
                </li>
             `
    })
    listCoursesBlock.innerHTML = htmls.join("")
}

// Creat new courses
function handleCreatCourse() {
    creatBtn.onclick = function() {
        let name = $('input[name = "name"]').value
        let description = $('input[name = "description"]').value
        let srcImage = $('input[name = "imgCourse"]').value
        let nameTeacger = $('input[name = "nameTeacher"]').value
        let dataForm = {
            name: name,
            description: description,
            src: srcImage,
            teacher: nameTeacger
        }
        creatCourses(dataForm, () => {
            getCourses(courses => {
                console.log(courses)
                renderCourses(courses)
            })
        })

    }
}

function creatCourses(dataForm, callback) {
    let option = {
        method: 'POST',
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
        },
        body: JSON.stringify(dataForm),

    }
    fetch(courseApi, option)
        .then((response) => {
            return response.json()
        })
        .then(callback)

}
// Delete Courses
function handleDeleteCourse(id) {
    let option = {
        method: 'DELETE',
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
        },

    }
    fetch(courseApi + '/' + id, option)
        .then((response) => {
            return response.json()
        })
        .then(() => {
            let courseItem = $('.course-item-' + id)
            if (courseItem) {
                courseItem.remove()
            }
        })
}

// Update Course
function handleModifyCourse(id) {
    creatBtn.innerText = 'Update'

    let nameForm = $('input[name = "name"]')
    let descriptionForm = $('input[name = "description"]')
    let srcImage = $('input[name = "imgCourse"]')
    let nameTeacger = $('input[name = "nameTeacher"]')
    console.log(nameForm)
    console.log(descriptionForm)
    console.log(srcImage)
    console.log(nameTeacger)

    let courseTitle = $('.name-' + id).innerText
    let courseDes = $('.description-' + id).innerText
    let courseImg = $('.src-' + id).getAttribute('src')
    let courseTeacher = $('.teacher-' + id).innerText
    console.log(courseTitle)
    console.log(courseDes)
    console.log(courseImg)
    console.log(courseTeacher)


    // console.log(courseTitle)
    // console.log(courseDes)
    nameForm.value = courseTitle
    descriptionForm.value = courseDes
    srcImage.value = courseImg
    nameTeacger.value = courseTeacher




    creatBtn.onclick = function() {
        let updateData = {
            name: nameForm.value,
            description: descriptionForm.value,
            src: srcImage.value,
            teacher: nameTeacger.value

        }
        modifyCourse(updateData, id, creatBtn)
    }

}

function modifyCourse(updateData, id, creatBtn) {
    let option = {
        method: 'PATCH',
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
        },
        body: JSON.stringify(updateData)
    }
    fetch(courseApi + '/' + id, option)
        .then((response) => response.json())
        .then(() => {
            getCourses(courses => {
                console.log(courses)
                renderCourses(courses)
            })
            creatBtn.innerText = 'Creat Courses'
            handleCreatCourse()
        });

}