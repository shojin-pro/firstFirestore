import type { NextPage } from 'next';
import {useState} from 'react';
import axios from 'axios';


const Home: NextPage = () => {
  const [input, setInput] = useState("");
  const data = {id:input};
  const insertUser = async () => {
    if(input === ""){
      await axios.post('/api/user').then(res => alert("登録完了(Id自動) " + res.data.id)).catch(error=> alert("登録失敗(ID自動)"));
    }else{
      await axios.post('/api/user',data).then(res => alert("登録完了(Id手動) " + res.data.id)).catch(error => alert("登録失敗(Id手動) " + input));
    }
  };

  const updateUser = async() => {
    if(input === ""){
      alert("文字列を入力してください。")
    }else{
      await axios.patch('/api/user',data).then(res => alert("更新完了 " + res.data.id)).catch(error => alert("更新失敗 " + input));
    }
  }

  const getUser = async() => {
    if(input === ""){
      alert("文字列を入力してください。")
    }else{
      await axios.get('/api/user',{params:data}).then(res => {alert("取得完了 " + res.data.id + " " + res.data.data.name + " " + res.data.data.email);console.log(res);}).catch(error => alert("取得失敗 " + input));
    }
  }

  const deleteUser = async() => {
    if(input === ""){
      alert("文字列を入力してください。")
    }else{
      await axios.delete('/api/user',{data:data}).then(res => alert("削除完了 " + res.data.id)).catch(error => alert("削除失敗 " + input));
    }
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center py-2">
      <label className="block text-gray-700 text-sm font-bold mb-2">
        id
      </label>
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)} 
        className="w-60 shadow appearance-none border rounded py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"></input>
      <button
        className="mt-10 w-60 rounded-full bg-green-500 py-2 px-4 font-bold text-white hover:bg-green-700"
        onClick={() => insertUser()}>
        Insert User
      </button>
      <button
        className="mt-4 w-60 rounded-full bg-yellow-500 py-2 px-4 font-bold text-white hover:bg-yellow-700"
        onClick={() => updateUser()}>
        Update User
      </button>
      <button
        className="mt-4 w-60 rounded-full bg-blue-500 py-2 px-4 font-bold text-white hover:bg-blue-700"
        onClick={() => getUser()}>
        Get User
      </button>
      <button
        className="mt-4 w-60 rounded-full bg-red-500 py-2 px-4 font-bold text-white hover:bg-red-700"
        onClick={() => deleteUser()}>
        Delete User
      </button>
    </div>
  );
};

export default Home;