import React, { useState, useEffect } from 'react'
export default function HeaderTask({ handleSubmit }) {
    function uuidv4() {
        return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, c =>
            (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
        );
    }
    const [learn, setLearn] = useState("");
    const [date, setDate] = useState("");
    const [name, setName] = useState("");
    const [status, setStatus] = useState("Choose");
    const [error, setError] = useState("");

    const handleValidation = () => {
        let isValid = true;
        if (learn === "" && date === "" && name === "" && status === "Choose") {
            setError("Please fill out the information completely!");
            return false;
        }
        if (learn.trim() === "") {
            setError("Please enter content");
            isValid = false;
        } else if (date === "") {
            setError("Please select a due date");
            isValid = false;
        } else if (status === "Choose") {
            setError("Please select a status");
            isValid = false;
        } else if (name.trim() === "") {
            setError("Please enter the name");
            isValid = false;
        } else {
            setError("");
        }
        return isValid;
    };
    useEffect(() => {
        if (error !== "") {
            const timeh = setTimeout(() => {
                setError("");
            }, 2000);

            return () => {
                clearTimeout(timeh);
            };
        }
    }, [error]);
    const resetForm = () => {
        setLearn("");
        setDate("");
        setName("");
        setStatus("Choose");
    };

    const handleSubmission = () => {
        if (handleValidation()) {
            const newUser = { id: uuidv4(), learn, date, name, status };
            handleSubmit(newUser);
            resetForm();
        }
    };
    return (
        <header>
            <span>@</span>
            <input name="learn" value={learn} placeholder="Enter a course"
                onChange={(e) => setLearn(e.target.value)}
            />
            <span>@</span>
            <input type="date" name="date" value={date}
                onChange={(e) => setDate(e.target.value)}
            />
            <span>@</span>
            <div class="custom-select">
                <select onChange={(e) => {
                    setStatus(e.target.value)
                }} value={status} id="status" name="status">
                    <option value="Choose">Choose...</option>
                    <option value="Pending">Pending</option >
                    <option value="Full fill">Full fill</option>
                    <option value="Reject">Reject</option>
                </select>
            </div>
            <span>@</span>
            <input name="name" type="text" value={name} placeholder="Enter your's name" onChange={(e) => setName(e.target.value)} />
            <button onClick={handleSubmission}>Submit</button>
            {error && <p className="error">{error}</p>}
        </header>

    )
}
