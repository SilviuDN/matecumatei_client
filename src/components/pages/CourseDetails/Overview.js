// import Tab from 'react-bootstrap/Tab'
// import Tabs from 'react-bootstrap/Tabs'

function Overview({course}) {
  
  return (
    <>
        <h2>Prezentare generala:</h2>
        <h4>Despre curs:{/*About this course:*/}</h4>
        <hr/>
        <h4>Date numerice{/*Numbers*/}:</h4>
        <ul>
            <li>Dificultate{/*Skill level*/}: {course.skillLevel}</li>
            {/* <li>Students: {course.students.length}</li> */}
            <li>Limbă{/*Language*/}: {course.language}</li>
            <li>Lecții{/*Lectures*/}: {course.lecturesNumber}</li>
            <li>Durată totală{/*Total video duration*/}: {course.totalTimeInSeconds} ore</li>
        </ul>
        <hr/>
        <h4>Descriere{/*Description*/}:</h4>
        {/* <p>{course.description}</p> */}
        {
            course.description.map( (paragraph, keyNum) => <p key={keyNum}>{paragraph}</p>)
        }
        {/* <ul>
            <li>Highlights</li>
            <li>What you get</li>
            <li>What you'll learn</li>
            <li>Course requirements / prerequisites</li>
            <li>Who this course is for</li>
        </ul> */}
        <hr/>
    </>
  )
}
export default Overview