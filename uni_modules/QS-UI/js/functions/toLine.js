module.exports = function toLine(name, str = '_') {	//驼峰转中划线 
  return name.replace(/([A-Z])/g, `${str}$1`).toLowerCase();
}