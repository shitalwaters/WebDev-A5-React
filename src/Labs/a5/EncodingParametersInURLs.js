import React, { useEffect, useState } from "react";
import axios from "axios";

function EncodingParametersInURLs() {

    const API_BASE = process.env.REACT_APP_API_BASE.slice(0, -4);

    const [a, setA] = useState(34);
    const [b, setB] = useState(23);

    const [result, setResult] = useState(0);
    const fetchSum = async (a, b) => {
        const response = await
            axios.get(`${API_BASE}/a5/add/${a}/${b}`);
        setResult(response.data);
    };
    const fetchSubtraction = async (a, b) => {
        const response = await axios.get(
            `${API_BASE}/a5/subtract/${a}/${b}`);
        setResult(response.data);
    };


    const [welcome, setWelcome] = useState("");
    const fetchWelcome = async () => {
        const response = await axios.get(`${API_BASE}/a5/welcome`);
        setWelcome(response.data);
    };
    useEffect(() => {
        fetchWelcome();
    }, []);

    return (
        <div>
            <h3>Encoding Parameters In URLs</h3>
            <h1>Integrating React with APIs</h1>
            <h2>Fetching Welcome</h2>
            <h3>{welcome}</h3>
            <hr />
            <h4>Calculator</h4>
            <input
                onChange={(e) => setA(e.target.value)}
                className="form-control" type="number" value={a} />
            <input
                onChange={(e) => setB(e.target.value)}
                className="form-control" type="number" value={b} />

            <h3>Fetch Result</h3>
            Result:
            <input value={result}
                className="form-control mb-2" type="number" readOnly
            />
            <button onClick={() => fetchSum(a, b)}
                className="btn btn-primary" >
                Fetch Sum of {a} + {b}
            </button>
            <button onClick={() => fetchSubtraction(a, b)}
                className="btn btn-danger " >
                Fetch Substraction of {a} - {b}
            </button>
            <h3>Path Parameters</h3>
            <a
                href={`${API_BASE}/a5/add/${a}/${b}`}
                className="btn btn-primary">
                Add {a} + {b}
            </a>
            <a
                href={`${API_BASE}/a5/subtract/${a}/${b}`}
                className="btn btn-danger">
                Substract {a} - {b}
            </a>
            <h3>Query Parameters</h3>
            <a
                href={`${API_BASE}/a5/calculator?operation=add&a=${a}&b=${b}`}
                className="btn btn-primary">
                Add {a} + {b}
            </a>
            <a
                href={`${API_BASE}/a5/calculator?operation=subtract&a=${a}&b=${b}`}
                className="btn btn-danger">
                Substract {a} - {b}
            </a>

        </div>
    );
}
export default EncodingParametersInURLs;