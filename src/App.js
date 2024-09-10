import axios from "axios";
import { useEffect, useState } from "react";

function App() {
  const [userData, setUserData] = useState('')

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get('http://localhost:3001/api/getDataFromRedis')
        console.log(response.data.result)
        setUserData(response.data.result)
      } catch (err) {
        console.error(err)
      }
    }

    fetchData()
  }, [])

  return (
    <>
      {
        userData && <div>
          {userData}
        </div>
      }
    </>
  );
}

export default App;
