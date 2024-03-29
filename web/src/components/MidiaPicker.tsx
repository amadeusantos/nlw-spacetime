"use client";

import { ChangeEvent, useState } from "react";

export function MidiaPicker() {
  const [preview, setPreview] = useState<string | null>(null);

  function onFileSelected(event: ChangeEvent<HTMLInputElement>) {
    const { files } = event.target;

    if (!files) {
      return;
    }

    const previewURL = URL.createObjectURL(files[0]);

    setPreview(previewURL);
  }

  return (
    <>
      <input
        type="file"
        id="midia"
        name="coverUrl"
        accept="image/*"
        onChange={onFileSelected}
        className="invisible h-0 w-0"
      />
      {preview && (
        // eslint-disable-next-line
        <img
          src={preview}
          alt="1"
          className="aspect-video w-full rounded-lg object-cover"
        />
      )}
    </>
  );
}
