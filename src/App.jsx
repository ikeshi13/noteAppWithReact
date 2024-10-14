import "./App.css";
import Sidebar from "./components/Sidebar";
import Main from "./components/Main";
import { useEffect, useState } from "react";
import uuid from "react-uuid";

function App() {
  // ローカルストレージに値があればjson→オブジェクトにして取得してくる
  const [notes, setNotes] = useState(JSON.parse(localStorage.getItem("notes")) || []);
  const [activeNote, setActiveNote] = useState(false);

  // notesの中身が変わるたびに発火
  useEffect(() => {
    // ローカルストレージにノートを保存する
    localStorage.setItem("notes", JSON.stringify(notes));
  }, [notes]);

  // リロードした際に1番上（更新順）のデータをactiveにする
  useEffect(() => {
    setActiveNote(notes[0].id);
  }, []);

  const onAddNote = () => {
    const newNote = {
      id: uuid(),
      title: "",
      content: "",
      modDate: Date.now(),
    };
    setNotes([...notes, newNote]);
  };
  const onDeleteNote = (id) => {
    const filterNotes = notes.filter((note) => note.id !== id);
    setNotes(filterNotes);
  };
  const getActiveNote = () => {
    return notes.find((note) => note.id === activeNote);
  };
  const onUpdateNote = (updatedNote) => {
    // 修正された新しいノートの配列を返す
    const updatedNotesArray = notes.map((note) => {
      if (note.id === updatedNote.id) {
        return updatedNote;
      } else {
        return note;
      }
    });
    setNotes(updatedNotesArray);
  };

  return (
    <div className="App">
      <Sidebar onAddNote={onAddNote} notes={notes} onDeleteNote={onDeleteNote} activeNote={activeNote} setActiveNote={setActiveNote} />
      <Main activeNote={getActiveNote()} onUpdateNote={onUpdateNote} />
    </div>
  );
}

export default App;
