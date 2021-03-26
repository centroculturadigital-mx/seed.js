const fs = require('fs')
const { Readable } = require('stream')

const faker = require("faker")

function bufferToStream(buffer) {
  const newStream = new Readable()
  newStream.push(buffer)
  newStream.push(null)
  return newStream
}

const capitalize = (s) => {
    if (typeof s !== 'string') return ''
    return s.charAt(0).toUpperCase() + s.slice(1)
}


function slugify (str) {
    str = str.replace(/^\s+|\s+$/g, ''); // trim
    str = str.toLowerCase();
  
    // remove accents, swap ñ for n, etc
    var from = "àáäâèéëêìíïîòóöôùúüûñç·/_,:;";
    var to   = "aaaaeeeeiiiioooouuuunc------";
    for (var i=0, l=from.length ; i<l ; i++) {
        str = str.replace(new RegExp(from.charAt(i), 'g'), to.charAt(i));
    }
  
    str = str.replace(/[^a-z0-9 -]/g, '') // remove invalid chars
        .replace(/\s+/g, '-') // collapse whitespace and replace by -
        .replace(/-+/g, '-'); // collapse dashes
  
    return str;
}

const { blocks, content } = require("./funciones/contentGenerar")
const relation = require('./funciones/generarRelaciones')


const name = (numMax,numMin) =>  capitalize(faker.random.words(
  Math.max(Math.ceil(Math.random()*numMax),numMin)
).toLowerCase())

const email = () => faker.internet.email()

const phone = () => faker.phone.phoneNumber()


const date = (min,max) => faker.date.between(min,max);

const paragraph = (longitud=256) => {

  let t = capitalize(faker.lorem.paragraph().toLowerCase())
  while( t.length > longitud ) {
    let tt = t.split(" ")
    tt.pop()
    t = tt.join(" ")
  }
  
  t = t.split(". ").map(e=>capitalize(e))
  t = t.join(". ")
  
  return t
}


const html = (withMedia = false, corto=false) => corto ? `
<p>Ad dolore deserunt elit culpa commodo sint id cillum eiusmod ut tempor nisi.</p>
<ul>
  <li>Fugiat sunt occaecat labore do duis magna incididunt sint cupidatat Lorem mollit.</li>
  <li>Tempor culpa sit tempor exercitation nisi ut occaecat proident.</li>
</ul>
` :`
<h1>Título principal</h1>

${withMedia ? '<iframe src="https://www.youtube.com/embed/C0DPdy98e4c" width="100%" height="480px" frameborder="0" allowfullscreen=""></iframe>': ''}

<p>Ad dolore deserunt elit culpa commodo sint id cillum eiusmod ut tempor nisi.</p>
<ul>
  <li>Fugiat sunt occaecat labore do duis magna incididunt sint cupidatat Lorem mollit.</li>
  <li>Tempor culpa sit tempor exercitation nisi ut occaecat proident.</li>
</ul>
<p>Ipsum do commodo ullamco fugiat occaecat aute officia cupidatat qui eu veniam dolor excepteur. Culpa non ipsum id minim Lorem. Esse esse culpa culpa sunt proident officia sunt adipisicing ad ex commodo aute esse. Laborum do laboris id commodo ad veniam adipisicing velit do.</p>
${withMedia ? '<p><img src="http://fakeimg.pl/600x400" alt="Imagen falsa"></p>' : ''}
<hr>

<p>Un enlace a <a href="https://wikipedia.org/">un sitio</a>.</p>

<hr>



<details>

  <summary>
    <h4>Información desplegable 1</h4>
  </summary>
  
  <p>Ipsum do commodo ullamco fugiat occaecat aute officia cupidatat qui eu veniam dolor excepteur. Culpa non ipsum id minim Lorem. Esse esse culpa culpa sunt proident officia sunt adipisicing ad ex commodo aute esse. Laborum do laboris id commodo ad veniam adipisicing velit do.</p>
      
  <p>Un enlace a <a href="https://wikipedia.org/">un sitio</a>.</p>

</details>


<details>

  <summary>
    <h4>Información desplegable 1</h4>
  </summary>
  
  <p>Ipsum do commodo ullamco fugiat occaecat aute officia cupidatat qui eu veniam dolor excepteur. Culpa non ipsum id minim Lorem. Esse esse culpa culpa sunt proident officia sunt adipisicing ad ex commodo aute esse. Laborum do laboris id commodo ad veniam adipisicing velit do.</p>
      
  <p>Un enlace a <a href="https://wikipedia.org/">un sitio</a>.</p>
  
</details>


<p>Un enlace a <a href="https://wikipedia.org/">un sitio</a>.</p>

`

const pdf = async () => {

  const filename = "sample.pdf"
  const encoding = "binary"
  const mimetype = 'application/pdf'

  const fileRead = await fs.readFileSync(__dirname+'/descargables/'+filename)
  
  const buffer = Buffer(fileRead)

  const file = { createReadStream: () => bufferToStream(buffer), filename, mimetype, encoding }

  return file

}



const video = () =>  `<iframe src="https://www.youtube.com/embed/C0DPdy98e4c" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`
const embededUrl = () =>  `https://www.youtube.com/embed/C0DPdy98e4c`


const socialMedia = (name) =>  ({
    facebook: `https://facebook.com/${slugify(name)}`,
    twitter: `https://twitter.com/${slugify(name)}`,
    instagram: `https://instagram.com/${slugify(name)}`,
})

const avatar = (gender) => {
  
  const men = new Array(100).fill({}).map((e,i)=>`https://randomuser.me/api/portraits/men/${i+1}.jpg`)
  const women = new Array(100).fill({}).map((e,i)=>`https://randomuser.me/api/portraits/women/${i+1}.jpg`)
  

  if( gender == "male" ) {
    options = men
  } else if( gender == "female" ) {
    options = women
  } else {
    options = [
      ...men,
      ...women
    ]
  }


  return options[Math.floor( Math.random() * options.length )]
  
}

module.exports = {
    paragraph,
    avatar,
    video,
    embededUrl,
    html,
    pdf,
    socialMedia,
    blocks,
    content,
    name,
    date,
    relation,
    email,
    phone
}

