module.exports =  function (name, char = '_') {
	const rep = new RegExp(`\${char}(\w)`, 'g');
    return name.replace(rep, function(all, letter){
        return letter.toUpperCase();
    });
}