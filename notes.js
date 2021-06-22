const fs=require('fs');
const chalk=require('chalk')
const readNote=(title)=>{

    const notes=loadNotes();
    const findNote=notes.find((note)=>note.title.toLowerCase()===title.toLowerCase())
    if(findNote)
    {
        console.log(chalk.green.inverse("Note found!"))
        console.log(chalk.green.bold(title));
        console.log(findNote.body);
    }
    else{
        console.log(chalk.red.inverse("Notes not found!"))
    }

}
const addNote=(title,body)=>
{
const notes=loadNotes();
const duplicateNote=notes.filter((note)=>note.title.toLowerCase()===title.toLowerCase())
if(duplicateNote.length==0)
{

    notes.push({
        title:title[0].toUpperCase()+title.slice(1),
        body:body
    })
    saveNotes(notes)
    console.log(chalk.green.inverse("New note added!"))

}
else
    console.log(chalk.red.inverse("Note title exist"))
}

const saveNotes=(notes)=>
{
 const dataJSON=JSON.stringify(notes);
 fs.writeFileSync('notes.json',dataJSON);
}

const removeNote=(title)=>{

    const notes=loadNotes();
    const updatedNote=notes.filter((note)=>note.title.toLowerCase()!==title.toLowerCase())
    if(updatedNote.length!=notes.length)
    {
        saveNotes(updatedNote)
        console.log(chalk.green.inverse("Successfully removed the note"))
    }
    else
     console.log(chalk.red.inverse("Found no such note!"))
}

const loadNotes=()=>{

    try{
        const dataBuffer=fs.readFileSync('notes.json');
        const dataJSON=dataBuffer.toString();
       
        return(JSON.parse(dataJSON));
    }
    catch(e)
    {
        return [];
    }
    
}

const listNotes=()=>{

    const notes=loadNotes();
    if(notes.length>0)
    {
    console.log(chalk.green("Your notes.."))
     notes.forEach((data,index)=>
     {
         console.info(`${index+1}. ${data.title}`);
    })
    }
    else
     console.log(chalk.inverse("Notes is empty!"))
    
}
module.exports={
    addNote,
    removeNote,
    listNotes,
    readNote
}