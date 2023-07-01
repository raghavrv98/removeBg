import React, { useState } from "react";

export default function RemoveBg() {

  const [oriImage, setOriImage] = useState(null);
  const [bgremove, setBgremove] = useState(null);

  console.log('image: ', oriImage);

  const handleChangeBg = () => {

    const apiKey = "34d9496bfadbb1401e0824e04163015e16c47c56";
    const url = 'https://sdk.photoroom.com/v1/segment';

    const formData = new FormData();
    formData.append('image_file', oriImage, oriImage.name)
    formData.append('size', "auto")

    fetch(url, {
      method: 'POST',
      headers: {
        'X-Api-key': apiKey
      },
      body: formData
    }).then((res) => res.blob()).then((blob) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        setBgremove(reader.result)
      }
      reader.readAsDataURL(blob);
    }).catch((error) => {
      console.log('error: ', error);
    })
  }

  return (
    <div>
      <div>
        <h2>Remove Background image</h2>
        <div>
          <div>
            <input accept="image/*" type="file" onChange={(e) => { setOriImage(e.target.files[0]) }} />
          </div>
          <button onClick={handleChangeBg}>Remove Background</button>
        </div>
        <div style={{ display: "flex", justifyContent: "space-evenly" }}>
          {
            oriImage && <div>
              <h4>Original Image</h4>
              <img style={{ height: '300px', width: '300px', border: '1px solid black' }} src={URL.createObjectURL(oriImage)} alt="orignalImage" />
            </div>
          }
          {
            bgremove && <div>
              <h4>After Remove Background</h4>
              <img style={{ height: '300px', width: '300px', border: '1px solid black' }} src={bgremove} alt="removebg" />
            </div>
          }
        </div>
      </div>
    </div>
  )
}