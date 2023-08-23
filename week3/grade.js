document.addEventListener("DOMContentLoaded", function () {
  document
    .getElementById("formCalculator")
    .addEventListener("submit", function (event) {
      event.preventDefault();

      var name = document.getElementById("name").value;
      var grade = document.getElementById("grade").value;

      const result = calCulatorGrade(name, grade);
      console.log(result);
      document.getElementById("result").textContent = result;
    });

  function calCulatorGrade(name, grade) {
    if (grade > 100) {
      return "คะแนนที่กรอกควรไม่เกิน : 100";
    } else if (grade >= 80) {
      return `ชื่อ : ${name} เกรด : A`;
    } else if (grade >= 70) {
      return `ชื่อ : ${name} เกรด : B`;
    } else if (grade >= 60) {
      return `ชื่อ : ${name} เกรด : C`;
    } else if (grade >= 50) {
      return `ชื่อ : ${name} เกรด : D`;
    } else if (grade < 50) {
      return `ชื่อ : ${name} เกรด : F`;
    }
  }
});
