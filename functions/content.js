const blocks = (numMax,numMin) => {

  if( parseInt(numMax) > 0 ) {

    let amount = Math.max(Math.ceil(Math.random()*numMax),numMin)
  
    let blocks = new Array( amount ).fill(0).map(e=>{
  
      const types = [
        'paragraph',
        'heading',
        'blockquote'
      ]
  
      let whichType = Math.floor(Math.random() * types.length);

      let type = types[whichType]
      
      let text
  
      switch (whichType) {
        case 'paragraph':
          text = faker.lorem.paragraph()
          break;
        case 'blockquote':
          text = faker.lorem.paragraph()
          break;
              
        default:
          text = faker.lorem.words( 4 + Math.floor(Math.random() * 6) )
          break;
      }
      
        return `{\"object\":\"block\",\"type\":\"${type}\",\"data\":{},\"nodes\":[
            {\"object\":\"text\",\"text\":\"${text}\",\"marks\":[]}
        ]},`
  
    }).reduce((e,acc)=>acc += e,'')
    
    blocks=blocks.substring(0, blocks.length - 1);    
  
    return blocks

  }
  
  return ''

}

  

const content = (numMax,numMin,config) => {

    if( ! numMax ) {
        numMax = 0
    }

    if( ! numMin ) {
        numMin = numMax
    }

    const {
      initialType,
      titleLength
    } = {...config}

    let initialText

    switch( initialType ) {
      
      case "enunciado":
        initialText = faker.lorem.sentence()
        break;

      default:
        initialText = faker.lorem.paragraph()
        
    }

    let wordsTitle = titleLength` ? titleLength` : 4+Math.ceil(Math.random()*5)

    return ({
        create: {
          document: `{\"object\":\"document\",\"data\":{},\"nodes\":[
            
            {\"object\":\"block\",\"type\":\"heading\",\"data\":{},\"nodes\":[
                {\"object\":\"text\",\"text\":\"${faker.random.words(wordsTitle)}\",\"marks\":[]}
            ]},
            
            {\"object\":\"block\",\"type\":\"paragraph\",\"data\":{},\"nodes\":[
                {\"object\":\"text\",\"text\":\"${initialText}\",\"marks\":[]}
            ]}
    
            ${numMax>0 ? ',' : ''}

            ${blocks(numMax,numMin)}
    
        ]}`
    
          
        }
    })
}


module.exports = {
    blocks,
    content
}