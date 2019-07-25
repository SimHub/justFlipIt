# A simple and lightning fast jQuery plugin  
[![Travis](https://img.shields.io/travis/SimHub/justFlipIt.svg?style=flat-square)](https://travis-ci.org/SimHub/justFlipIt)  [![npm](https://img.shields.io/npm/dt/justflipit.svg?style=flat-square)](https://www.npmjs.com/package/justflipit) [![npm](https://img.shields.io/npm/v/justflipit.svg?style=flat-square)](https://www.npmjs.com/package/justflipit)  [![npm](https://img.shields.io/npm/l/justflipit.svg?style=flat-square)](https://www.npmjs.com/package/justflipit)   [![GitHub forks](https://img.shields.io/github/forks/SimHub/justFlipIt.svg?style=social&label=Fork&style=flat-square&style=flat-square)](https://img.shields.io/github/forks/SimHub/justFlipIt) [![Bower](https://img.shields.io/bower/l/justFlipIt.svg?style=social&label=Bower&style=flat-square&style=flat-square)](https://bower.io/search/)  



   
  justFlipIt is a lightweight jQuery plugin that allows you to implement CSS3 based flip animations on any DOM elements.  


# Demo - Documentation
 [_GO HERE_](http://simhub.github.io/justFlipIt/) 
  
# Install  

## NPM 
  
    $ npm install justflipit
  or  
    
    $ yarn add justflipit  
    
    
### BOWER 

    $ bower install justFlipIt  
    
### GITHUB 
  
    clone or download .zip file    

# Usage
  Include the Javascript after jQuery  

      <script src="https://ajax.googleapis.com/ajax/libs/jquery/2.1.4/jquery.min.js"></script>
      <script src="./your_path_to/justFlipIt.min.js"></script>
  
  Initialize the script:   

      $('[elementName]').justFlipIt();
  
# That's it! :punch: :blush:   

# Want More options?  

| Name/Key      | Possible value             | Default | Description                                              |
| ------------- |:---------------------------|:-------:|---------------------------------------------------------:|
| Hover         |             -              |    -    |$('[elementName]').justFlipIt();                          |
| Click         | false/true/'\[elementName]'|  false  |$('[elementName]').justFlipIt({ Click:'[elementName]' }); |
                                                                                    

### destroy  

    $('[elementName]').destroy();     
    

...[there's even more](http://simhub.github.io/justFlipIt/#g)                         

   
# License:  MIT
  Copyright (c) 2015 simon Lackmann
  
  Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
 
  The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
  
  THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
