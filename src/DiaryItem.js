import React, { useContext, useEffect, useRef, useState } from "react";
import { DiaryDispatchContext } from './App';

const DiaryItem = ({
  id,
  author,
  content,
  emotion,
  created_date,
}) => {

  useEffect(() => {
    console.log(`${id}`)
  })

  const { onEdit, onRemove } = useContext(DiaryDispatchContext);

  const [isEdit, setIsEdit] = useState(false);
  const toggleEdit = () => setIsEdit(!isEdit);

  const [localContent, setLocalContent] = useState(content);
  const localContentInput = useRef();

  const handleRemove = () => {
    if (window.confirm(`${id}번째 일기를 삭제하시겠습니까?`)) {
      onRemove(id);
    }
  };

  const handleQuitEdit = () => {
    setIsEdit(false);
    setLocalContent(content);
  };

  const handleEdit = () => {
    if (localContent.length < 5) {
      localContentInput.current.focus();
      return;
    }

    if (window.confirm(`${id}번째 일기를 수정하시겠습니까?`)) {
      onEdit(id, localContent);
      toggleEdit();
    }
  };

  return (
    <div className="DiaryItem">
      <div className="info">
        <div>
          <span>
            작성자: {author} │ 이날의 감정: {emotion}
          </span>
          <span className="date">
            {new Date(created_date).toLocaleString()}
          </span>
        </div>
        <div className="btn-container">
          {isEdit ? (
            <>
              <button onClick={handleQuitEdit}>수정 취소</button>
              <button onClick={handleEdit}>수정 완료</button>
            </>
          ) : (
            <>
              <button onClick={handleRemove}>삭제하기</button>
              <button onClick={toggleEdit}>수정하기</button>
            </>
          )}
        </div>
      </div>

      <div className="content">
        {isEdit ? (
          <>
            <textarea
              ref={localContentInput}
              value={localContent}
              onChange={(e) => {
                setLocalContent(e.target.value);
              }}
            />
          </>
        ) : (
          <>{content}</>
        )}
      </div>
    </div>
  );
};

// 최적화 1단계: React.memo로 컴포넌트를 감쌈
export default React.memo(DiaryItem);
