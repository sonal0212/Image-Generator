import { useState } from "react";
import "./App.css";
import { Configuration, OpenAIApi } from "openai";

function App() {
  const [prompt, setPrompt] = useState("");
  const [image, setImage] = useState(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState(null);

  const configuration = new Configuration({
    apiKey: "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",
  });

  const openai = new OpenAIApi(configuration);

  const generateImage = async () => {
    try {
      setIsGenerating(true);
      setError(null);
      const res = await openai.createImage({
        prompt: prompt,
        n: 1,
        size: "512x512",
      });
      setImage(res.data.data[0].url);
      setIsGenerating(false);
    } catch (e) {
      setIsGenerating(false);
      setError("Error generating image. Try something else please!!");
      console.log(e);
    }
  };

  return (
    <>
      <div className="App">
        <h1 className="heading">Generate Image with OpenAi</h1>
        <div className="generate">
          <input
            type="text"
            placeholder="Enter your text..."
            className="search"
            onChange={(e) => setPrompt(e.target.value)}
          />
          <button
            className="btn"
            disabled={isGenerating}
            onClick={generateImage}
          >
            Generate...
          </button>
        </div>
        {isGenerating && <div className="loading"> Generating Image...</div>}
        {error && <div className="error">Error: {error}</div>}
        {image && (
          <div>
            <img className="image" src={image} alt="Generating Image" />
          </div>
        )}
      </div>
    </>
  );
}

export default App;
