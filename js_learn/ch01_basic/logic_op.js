const value = prompt("Please log in, input username:");
if (value == 'TheMaster') alert('Welcome!');
else if (value === '' || value === null) alert('Canceled');
else alert('Wrong password');