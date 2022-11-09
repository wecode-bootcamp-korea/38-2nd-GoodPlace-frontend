import React, { useState, useCallback, useEffect, useRef } from "react";
import styled from "styled-components";
import variables from "../../../../styles/variables";
import Modal from "../../../../components/Modal/Modal";
import API from "../../../../config";

const ReviewForm = ({ params }) => {
  const [reviewStarRate, setReviewStarRate] = useState(10);
  const [isDragging, setIsDragging] = useState(false);
  const [files, setFiles] = useState([]);
  const [postResult, setPostResult] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [reviewContent, setReviewContent] = useState("");

  const dragRef = useRef();

  const onChangeFiles = useCallback(
    e => {
      let selectFiles = [];
      let tempFiles = files;

      if (e.type === "drop") {
        selectFiles = e.dataTransfer.files;
      } else {
        selectFiles = e.target.files;
      }

      for (const file of selectFiles) {
        tempFiles = [
          {
            id: 1,
            object: file,
          },
        ];
      }

      setFiles(tempFiles);
    },
    [files]
  );

  const uploadReview = () => {
    const formData = new FormData();

    formData.append("image", files[0].object);
    formData.append("roomId", params.id);
    formData.append("rating", reviewStarRate);
    formData.append("content", reviewContent);

    const postReview = async () => {
      const response = await fetch(API.review, {
        method: "POST",
        headers: {
          Authorization: localStorage.getItem("token"),
        },
        body: formData,
      });
      const result = await response.json();
      setPostResult(result);
      setIsModalOpen(true);
      setReviewContent("");
      setFiles([]);
    };
    postReview();
  };

  const handleDragIn = useCallback(e => {
    e.preventDefault();
    e.stopPropagation();
  }, []);

  const handleDragOut = useCallback(e => {
    e.preventDefault();
    e.stopPropagation();

    setIsDragging(false);
  }, []);

  const handleDragOver = useCallback(e => {
    e.preventDefault();
    e.stopPropagation();

    if (e.dataTransfer.files) {
      setIsDragging(true);
    }
  }, []);

  const handleDrop = useCallback(
    e => {
      e.preventDefault();
      e.stopPropagation();

      onChangeFiles(e);
      setIsDragging(false);
    },
    [onChangeFiles]
  );

  const rate = e => {
    setReviewStarRate(e.target.value);
  };

  useEffect(() => {
    if (dragRef.current !== null) {
      dragRef.current.addEventListener("dragenter", handleDragIn);
      dragRef.current.addEventListener("dragleave", handleDragOut);
      dragRef.current.addEventListener("dragover", handleDragOver);
      dragRef.current.addEventListener("drop", handleDrop);
    }
    return () => {
      if (dragRef.current !== null) {
        dragRef.current.removeEventListener("dragenter", handleDragIn);
        dragRef.current.removeEventListener("dragleave", handleDragOut);
        dragRef.current.removeEventListener("dragover", handleDragOver);
        dragRef.current.removeEventListener("drop", handleDrop);
      }
    };
  }, []);

  return (
    <S.ReviewWrap>
      {isModalOpen && (
        <Modal
          content={postResult?.message || "reviewPosted"}
          setIsModalOpen={setIsModalOpen}
        />
      )}
      <S.StarRatingWrap>
        <S.StarRatingTitle>별점 : </S.StarRatingTitle>
        <S.StarRating
          type="number"
          min="0"
          max="10"
          value={reviewStarRate}
          onChange={rate}
        ></S.StarRating>
      </S.StarRatingWrap>
      <S.UploadWrap>
        <S.ReviewArea
          onChange={e => {
            setReviewContent(e.target.value);
          }}
          value={reviewContent}
        />
        <div>
          <S.ImageUploadForm
            onDragEnter={handleDragIn}
            onSubmit={e => e.preventDefault()}
            isDragging={isDragging}
            ref={dragRef}
          >
            <S.ImageInput
              type="file"
              onChange={onChangeFiles}
              multiple={false}
            ></S.ImageInput>
            <S.ImageUploadLabel htmlFor="fileUpload">
              <div>
                <p>
                  {!files.length
                    ? "여기에 사진을 드래그해서 업로드"
                    : "업로드 완료"}
                </p>
              </div>
              {isDragging && <S.DragedFile></S.DragedFile>}
            </S.ImageUploadLabel>
          </S.ImageUploadForm>
          <S.UploadButton type="button" onClick={uploadReview}>
            작성 완료
          </S.UploadButton>
        </div>
      </S.UploadWrap>
    </S.ReviewWrap>
  );
};

const S = {
  ReviewWrap: styled.div`
    width: 1024px;
    height: 300px;
    padding: 30px 20px 20px 30px;
    background-color: #eeeeee;
  `,
  StarRatingWrap: styled.div`
    ${variables.flex("flex-start", "center", "row")};
    text-align: left;
    height: 50px;
  `,
  StarRating: styled.input`
    width: 60px;
    height: 25px;
    padding-left: 10px;
    border-radius: 5px;
    border: none;
    background-color: white;
    font-size: 20px;
    text-align: center;
    vertical-align: middle;
  `,
  StarRatingTitle: styled.h4`
    padding-top: 3px;
    font-family: GothicA1;
    font-size: 18px;
  `,
  ReviewArea: styled.textarea`
    width: 700px;
    height: 170px;
    padding: 10px 10px;
    border: none;
    resize: none;
    outline: none;
  `,
  UploadWrap: styled.div`
    ${variables.flex("space-between", "center", "row")};
    padding-top: 10px;
  `,
  ImageUploadForm: styled.form`
    position: relative;
    width: 250px;
    height: 130px;
    border-radius: 5px;
    border: none;
    background-color: ${({ isDragging, theme }) =>
      isDragging ? theme.brandColor : "white"};
    text-align: center;
  `,
  ImageInput: styled.input`
    display: none;
  `,
  ImageUploadLabel: styled.label`
    position: relative;
    width: 100%;
    height: 100%;
    div {
      width: 250px;
      position: absolute;
      top: 55px;
    }
  `,
  ImageUploadButton: styled.button`
    padding: 0.25rem;
    font-size: 1rem;
    border: none;
    font-family: "Oswald", sans-serif;
    background-color: white;
  `,
  DragedFile: styled.div`
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0px;
    right: 0px;
    bottom: 0px;
    left: 0px;
  `,
  UploadButton: styled.button`
    width: 250px;
    height: 30px;
    margin-top: 10px;
    border: none;
    border-radius: 5px;
    background-color: ${({ theme }) => theme.brandColor};
    color: white;
    &:hover {
      opacity: 0.8;
    }
  `,
};

export default ReviewForm;
