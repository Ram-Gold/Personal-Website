
function showmidbar() {
    const Navbar = document.querySelector('.Navbar')
    Navbar.style.display = 'flex'
}
function hidemidbar(){
    const Navbar = document.querySelector('.Navbar')
    Navbar.style.display = 'none'
  }
function scrolltoportfolio() {
    const element = document.querySelector('.portfolio-parent');
    element.scrollIntoView({ behavior: 'smooth' });
}
function scrolltocontact() {
    const element = document.querySelector('.sequence-controller');
    element.scrollIntoView({ behavior: 'smooth' });
}
function scrolltoabout() {
    const element = document.querySelector('.frame-section');
    element.scrollIntoView({ behavior: 'smooth' });
}
function scrolltohome() {
    const element = document.querySelector('.frame-group');
    element.scrollIntoView({ behavior: 'smooth' });
}