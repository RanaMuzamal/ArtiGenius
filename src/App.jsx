import { Configuration, OpenAIApi } from "openai";
import { useState } from "react";
import logo from "/artigenius-logo.png";

const configuration = new Configuration({
    apiKey: import.meta.env.VITE_REACT_APP_API_KEY,
});
const openapi = new OpenAIApi(configuration);

function App() {
    const [image, setImage] = useState("");
    const [inputData, setInputImage] = useState("");
    const [loading, setLoading] = useState(false);

    async function fetchData() {
        try {
            setLoading(true);
            const response = await openapi.createImage({
                prompt: inputData,
                n: 1,
                size: "512x512",
            });
            setImage(response.data.data[0].url);
            setLoading(false);
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <div className="container mx-auto align-center">
            <img
                src={logo}
                alt="kjsbvskn;mlA<"
                className="mx-auto m-5 w-[120px] md:w-[200px]"
            />

            <div className="w-full md:w-[70%] mx-auto px-3">
                <label
                    htmlFor="search"
                    className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
                >
                    Search
                </label>
                <div className="relative">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                        <svg
                            aria-hidden="true"
                            className="w-5 h-5 text-gray-500 dark:text-gray-400"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                            ></path>
                        </svg>
                    </div>
                    <input
                        type="search"
                        id="search"
                        onChange={(e) => setInputImage(e.target.value)}
                        className="block w-full p-3 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:border-dark  "
                        placeholder="Search"
                        required
                    />
                    <button
                        onClick={fetchData}
                        className="text-white absolute right-2.5 bottom-1.5 bg-[#ff4057]  focus:ring-4 focus:outline-none focus:ring-[#242424] font-medium rounded-lg text-sm px-4 py-2 "
                    >
                        Generate
                    </button>
                </div>
            </div>

            {loading ? (
                <div class="text-center m-5 ">
                    <div role="status">
                        <svg
                            aria-hidden="true"
                            class="inline w-8 h-8 mr-2 text-[#ff4057] animate-spin dark:text-[#ff4057] fill-[#ff4057]"
                            viewBox="0 0 100 101"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                                fill="currentColor"
                            />
                            <path
                                d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                                fill="currentFill"
                            />
                        </svg>
                        <span class="sr-only">Loading...</span>
                    </div>
                    <p className="text-white text-sm mt-2">
                        Please wait until your image is ready
                    </p>
                </div>
            ) : (
                <a href={image} download>
                    <img
                        src={image}
                        alt=""
                        className="mx-auto my-4 rounded-[20px] h-auto max-w-full px-3 md:mb-[50px]"
                    />
                </a>
            )}

            <footer class="fixed bottom-0 left-0 w-full bg-gray-900">
                <div class="container mx-auto py-2">
                    <p class="text-white text-sm text-center">
                        Powered by OpenAI
                    </p>
                </div>
            </footer>
        </div>
    );
}

export default App;
