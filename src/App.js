import { React, useState } from "react";
import './App.css';

const App=()=>{
    const [firstName,setFirstName]=useState("");
    const [lastName,setLastName]=useState("");
    const [email,setEmail]=useState("");
    const [contact,setContacts]=useState("");
    const [gender,setGender]=useState("other");
    const [subjects,setSubjects]=useState({
        english: true,
        maths: false,
        physics: false
    });
    const [resume,setResume]=useState("");
    const [foldersWithPDFs, setFoldersWithPDFs] = useState([]);
    const [url,setUrl]=useState("");
    const [selectOption,setSelectOption]=useState("");
    const [about,setAbout]=useState("");

    const handleSubjectChange = (sub) => {
        setSubjects((prev) => ({
            ...prev,
            [sub]: !prev[sub],
        }));
    };

    const handleReset=()=>{
        // Reset all state variables here
        setFirstName("");
        setLastName("");
        setEmail("");
        setContacts("");
        setSubjects({
            english: true,
            maths: false,
            physics: false,
        });
        setResume("");
        setFoldersWithPDFs("");
        setUrl("");
        setSelectOption("");
        setAbout("");
    };

    const handleSubmit = (e)=>{
        e.preventDefault();
        console.log(
            firstName,
            lastName,
            email,
            contact,
            gender,
            selectOption,
            subjects,
            resume,
            url,
            about
        );
        handleReset();
    };

    const handleFolderSelection = (event) => {
        const selectedFolders = event.target.files;

        // Iterate over each selected folder
        for (let i = 0; i < selectedFolders.length; i++) {
            const folder = selectedFolders[i];

            // Check if it's a directory
            if (folder.isDirectory) {
                const reader = folder.createReader();

                // Read all files in the directory
                reader.readEntries((entries) => {
                    // Check if the folder contains any PDF files
                    if (entries.some(entry => entry.name.endsWith('.pdf'))) {
                        setFoldersWithPDFs(prevFolders => [...prevFolders, folder]);
                    }
                });
            }
        }
    }
       

    return (
        <div className='App-data'>
            <h1>Form in React</h1>
            <fieldset className='App'>
                <form>
                    <label for='first'>
                        First Name*
                    </label>
                    <br/>
                    <input type='text' id='first' name='first' value={firstName} onChange={(e)=>{
                        setFirstName(e.target.value)
                    }} placeholder='Enter your FirstName'/>
                    <br/><br/>
                    <label for='last'>
                        Last Name*
                    </label>
                    <br/>
                    <input type='text' id='last' name='last' value={lastName} onChange={(e)=>{
                        setLastName(e.target.value)
                    }} placeholder="Enter Your LastName"/>
                    <br/><br/>
                    <label for='email'>
                        Enter Email*
                    </label>
                    <br/>
                    <input type='email' id='email' name='email' value={email} onChange={(e)=>{
                        setEmail(e.target.value)
                    }} placeholder="Enter Your Email Address"></input>
                    <br/><br/>
                    <label for='number'>
                        Contact*
                    </label>
                    <br/>
                    <input type='number' id='number' name='number' value={contact} onChange={(e)=>{ 
                        const onlyNumbers = e.target.value.replace(/[^\d]/g, ''); // Remove non-numeric characters
                        setContacts(onlyNumbers.slice(0,10)); 
                    }} placeholder="Enter Phone number" maxLength="10"></input>
                    <br/><br/>
                    <label for>Gender*</label>
                    <div className='radio_data'>
                        <div className='gender_radio_data'>
                            <input type='radio' id='male' name='gender_data' value='male'
                            checked={gender==="male"}
                            onChange={(e)=> setGender(e.target.value)}/>
                            <label for='male'>Male</label>
                        </div>
                        <div  className='gender_radio_data'>
                            <input type='radio' id='female' name='gender_data' value='female' checked={gender==="female"}
                            onChange={(e)=> setGender(e.target.value)}></input>
                            <label for='female'>Female</label>
                        </div>
                        <div  className='gender_radio_data'>
                            <input type='radio' id='other' name='gender_data' value='other' checked={gender==="other"}
                            onChange={(e)=> setGender(e.target.value)}></input>
                            <label for='other'>Other</label>
                        </div> 
                    </div>
                    <br/><br/>
                    <label>Your Best Subject</label>
                    <div className='checkbox_data'>
                        <div className='check_data'>
                            <input type='checkbox' id='english' name='lang' value='english' checked={subjects.english===true} onChange={()=>handleSubjectChange("english")}/>
                            <label for='english'>English</label>
                        </div>
                        <div  className='check_data'>
                            <input type='checkbox' id='maths' name='lang' value='maths' checked={subjects.maths===true} onChange={()=>handleSubjectChange("maths")}></input>
                            <label for='maths'>Maths</label>
                        </div>
                        <div  className='check_data'>
                            <input type='checkbox' id='physics' name='lang' value='physics' checked={subjects.physics===true} onChange={()=>handleSubjectChange("physics")}></input>
                            <label for='physics'>Physics</label>
                        </div> 
                    </div>  
                    <br/><br/>
                    <lable for='file'>Upload Resume*</lable>
                    <div className='resume'>
                        <input type='file' id='file' name='file' onChange={(e)=> setResume(e.target.files[0])} placeholder="Upload your file" required/>
                    </div>
                    <br/><br/>
                    <label>Folders with PDFs:</label>
                    <div className='resume'>
                        <input type="file" multiple directory="" webkitdirectory="" onChange={handleFolderSelection} />
                        <div>
                            <ul>
                                {foldersWithPDFs.map((folder, index) => (
                                    <li key={index}>{folder.name}</li>
                                ))}
                            </ul>
                        </div>
                    </div>
                    <br/><br/>
                    <label for='url'>Enter URL*</label>
                    <input type='text' id='url' name='url' value={url} onChange={(e)=> setUrl(e.target.value)}/>
                    <br/><br/>
                    <label>Select Your Choice</label>
                    <br/>
                    <select id='select' value={selectOption} onChange={(e)=>setSelectOption(e.target.value)}>
                        <option value='' disabled selected={selectOption===""}>
                            select your answer
                        </option>
                        <optgroup label='Beginers'>
                            <option value='1'>HTML</option>
                            <option value='2'>CSS</option>
                            <option value='3'>JavaScript</option>
                        </optgroup>
                        <optgroup label='Advance'>
                            <option value='4'>React</option>
                            <option value='5'>Node</option>
                            <option value='6'>Express</option>
                            <option value='7'>MongoDB</option>
                        </optgroup>
                    </select>
                    <br/><br/>
                    <label>About</label><br/>
                    <textarea name='message' rows='10' onChange={(e)=> setAbout(e.target.value)} required></textarea>
                    <br/><br/>
                    <div className='submit-data'>
                        <button type='reset' className='submit-form' value='reset' onClick={()=>handleReset()}></button>
                        <button type="submit" className='submit-form' value="Submit" onClick={(e)=>handleSubmit(e)}/>
                    </div>
                </form>
            </fieldset>
        </div>
    )
}

export default App;