document.querySelector('.menu-icon').addEventListener('click', () => {
 const buttonAdd = document.querySelector('.add-sidebar-js');
const menuRemove = document.querySelector('.menu-icon');

  if(buttonAdd) {
    buttonAdd.classList.remove('add-sidebar-js');
    buttonAdd.classList.add('sidebar');
    
  } 

  if (menuRemove) {
    menuRemove.classList.remove('menu-icon');
    menuRemove.classList.add('menu-js');
  }

})


document.querySelector('.button-exist').addEventListener('click', () => {
  const buttonRemove = document.querySelector('.sidebar');
  const menuAdd = document.querySelector('.menu-js');
 if (buttonRemove) {
  buttonRemove.classList.remove('sidebar');
  buttonRemove.classList.add('add-sidebar-js');
 }

 if (menuAdd) {
  menuAdd.classList.add('menu-icon');
  menuAdd.classList.remove('menu-js');
 }

 })

