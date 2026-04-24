
import AddTutorial from "../components/AddTutorial";
import TutorialList from "../components/TutorialList";
import axios from "axios";
import { useState, useEffect, useCallback } from "react";

const Home = () => {

    const [tutorials, setTutorials] = useState([])

    const url = process.env.REACT_APP_API_URL;


    //! GET (Read)
    const getTutorials = useCallback(async () => {
        try {
            const {data} = await axios.get(url) //! data'yı havada destructure ediyoruz;
            setTutorials(data); //! data'yı tutorials state'ine atıyoruz.
        } catch (error) {
            console.log(error);
        }
    }, [url]);

    //! componentDidMount olduğu için dependency array boş.
    //! componentDidMount ilk renderdan sonra bir defa çalışır.
    useEffect(() => {
        getTutorials();
    }, [getTutorials]); //! getTutorials fonksiyonunu dependency array'e ekliyoruz çünkü bu fonksiyon component içinde tanımlanmış ve her renderda yeniden oluşturuluyor. Bu da useEffect'in sürekli tetiklenmesine neden olabilir. getTutorials fonksiyonunu useCallback ile sarmalayarak bu sorunu çözebiliriz.

    // console.log(tutorials);


    //! POST (Create)
    const addTutorial =  async(tutorial) => {
        try {
            await axios.post(url, tutorial);
            getTutorials(); //! post işleminden sonra veriyi tekrar çekiyoruz.
        } catch (error) {
            console.log(error);
        }
        console.log('add')
    }


    //! DELETE (Delete)
    const deleteTutorial =  async(id) => {
        try {
          await axios.delete(`${url}${id}/`);
        } catch (error) {
          console.log(error);
        }
        getTutorials(); //! delete işleminden sonra veriyi tekrar çekiyoruz.
    };

    
    //! UPDATE (PUT:Whole Update, PATCH :Partially Update)
    const editTutorial = async (id, task, desc) => {
        
        //! Bu kisma gerek yok aslinda degistirmek istedigimiz
        //! veriler alt componentten geliyor. Dolayısiyla
        //! doğrudan axios istegini gonderebiliriz
        const filtered = tutorials.filter((tutor) => tutor.id === id).map(() => ({ task: task, description: desc })); //! id'ye göre filtreleyip, map ile update edip yeni bir array olusturduk.

        // console.log(filtered);

        try {
            await axios.put(`${url}${id}/`, filtered[0]);   //! put işlemi için id'ye ve güncellenecek verilere ihtiyacımız var.});
        } catch (error) {
            console.log(error);
        }


        // try {
        //     await axios.put(`${url}${id}/`, {   //! put işlemi için id'ye ve güncellenecek verilere ihtiyacımız var.
        //     task: task, 
        //     description: desc,
        //     });
        // } catch (error) {
        //     console.log(error);
        // }

        getTutorials(); //! put işleminden sonra veriyi tekrar çekiyoruz.
    }

    return (
        <>
            <AddTutorial addTutorial ={addTutorial} />
            <TutorialList 
                tutorials={tutorials} 
                deleteTutorial={deleteTutorial}
                editTutorial={editTutorial}
            />
            {/* <List tutorials={tutorials}/> */}
        </>
    )
}

export default Home;