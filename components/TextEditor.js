import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { convertFromRaw, convertToRaw, EditorState } from "draft-js";
import { db } from "../firebase.js";
import { useRouter } from "next/dist/client/router";
import { useSession } from "next-auth/client";
import { useDocumentOnce } from "react-firebase-hooks/firestore";

const Editor = dynamic(
  () => import("react-draft-wysiwyg").then((module) => module.Editor),
  { ssr: false }
);

function TextEditor() {
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const editorRef = useRef(null);
  const router = useRouter();
  const { id } = router.query;
  const [session] = useSession();

  function focusEditor() {
    editorRef.current.focus();
  }

  const [snapshot, loadingSnapshot] = useDocumentOnce(
    db.collection("userDocs").doc(session.user.email).collection("docs").doc(id)
  );

  useEffect(() => {
    if (snapshot?.data()?.editorState) {
      setEditorState(
        EditorState.createWithContent(
          convertFromRaw(snapshot?.data()?.editorState)
        )
      );
    }
    focusEditor();
  }, [snapshot]);

  const onEditorStateChange = (editorState) => {
    setEditorState(editorState);

    db.collection("userDocs")
      .doc(session.user.email)
      .collection("docs")
      .doc(id)
      .set(
        {
          editorState: convertToRaw(editorState.getCurrentContent()),
        },
        { merge: true }
      );
  };

  return (
    <div
      className="bg-[#f8f9fa] min-h-screen pb-16"
      ref={editorRef}
      onClick={focusEditor}
    >
      <Editor
        editorState={editorState}
        onEditorStateChange={onEditorStateChange}
        toolbarClassName="flex sticky top-0 z-50 !justify-center mx-auto"
        wrapperClassName="wrapperClassName"
        editorClassName="mt-6 p-10 bg-white shadow-lg max-w-4xl mx-auto mb-12 border"
      />
      ;
    </div>
  );
}

export default TextEditor;
