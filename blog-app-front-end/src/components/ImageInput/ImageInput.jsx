import { useEffect } from 'react'
import { updateImage } from '../../store';

const readImage = (retFile) => {
    const errorEl = document.getElementById('error-el')
    const fileName = document.getElementById('file-name')
    var reader = new FileReader();
    reader.readAsDataURL(retFile);
    reader.onload = function () {
        if (!errorEl.classList.contains('hidden')) errorEl.classList.add('hidden')
        updateImage(reader.result)
        fileName.innerText= retFile.name
    };
    reader.onerror = function (error) {
        if (errorEl.classList.contains('hidden')) errorEl.classList.remove('hidden')
        updateImage("")
        fileName.innerText("")
    };
}


const ImageInput = () => {
    
    const dropHandler = (event) => {


        event.preventDefault();

        let retFile = "";
      
        if (event.dataTransfer.items) {
            const item = event.dataTransfer.items[0]
            const type = item.type.split('/')
            if (item.kind === "file" && type[0] == 'image') retFile = item.getAsFile();
        } 
        else {
            const file = event.dataTransfer.files[0]
            const type = item.type.split('/')
            if (type[0] == 'image') retFile = file
        }
        if( (event.dataTransfer.items || event.dataTransfer.files) && retFile){  
            readImage(retFile)
        }
        removeBg()
    }

    const browseHander = (event) => {
        readImage(event.target.files[0])
    }

    const dragHandler = (event) => {
        event.preventDefault();
        const dropZone = document.querySelector('.border-dashed')
        if(!dropZone.classList.contains("bg-slate-400/20"))dropZone.classList.add("bg-slate-400/20")
    }

    
    const removeBg = (event) => {
        const dropZone = document.querySelector('.border-dashed')
        if(dropZone.classList.contains("bg-slate-400/20"))dropZone.classList.remove("bg-slate-400/20")
    }
    

    return ( 
        <>
            <div className="flex border-black border-[1.5px] rounded-lg mt-5 border-dashed" 
            onDrop={dropHandler}
            onDragOver={dragHandler}
            onDragLeave={removeBg}
            >   
                <div className='grow text-center py-20 flex flex-col'>
                    <span className="material-symbols-outlined text-9xl font-extralight">cloud_upload</span>
                    
                    <div className="italic text-slate-800 text-sm font-sans" id='file-name'></div>
                    Drag and Drop
                    <label className='underline text-sky-600 cursor-pointer no-drag'>
                        or Browse
                        <input type="file" className='hidden' accept='image/*' onChange={browseHander}/>
                    </label>
                    <div className='hidden text-[#ff0000] text-center' id="error-el">Error Occured!</div>
                </div>
            </div>
        </>
     );
}
 
export default ImageInput;