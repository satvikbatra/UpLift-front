// import { useComp } from "../hooks";

// export const Project = () => {
//     const {loading, details} = useComp("projects");
//     console.log("Type of details:", typeof details);
//     console.log(details)

//     return <div className="flex flex-col gap-4">
//         <div className="w-1/3 ">
//             <div className="card font-semibold text-xl flex justify-between">
//                 <div>Project</div>
//                 <div>+</div>
//             </div>
//         </div>
//         {/* {details.researchPapers.map((project: object) => {

//         })} */}
//         <div className="card flex flex-row gap-6">
//             <div className="h-20 w-20 rounded-2xl bg-gray-200 border-2 border-gray-300"></div>
//             <div className="border-2 w-full rounded-2xl px-4 py-1">
//                 <div className="text-lg font-medium">Enhancing Real-Time Speech Translation Using Transformer-Based Neural Networks</div>
//                 <div>This research paper explores the advancements in real-time speech translation by leveraging transformer-based neural networks, specifically BERT and GPT architectures. The study evaluates various deep learning models and their efficiency in handling multilingual speech-to-text tasks. By introducing a novel hybrid model that integrates attention mechanisms and contextual embeddings, the proposed system achieves a significant reduction in translation latency while improving accuracy.</div>
//             </div>
//         </div>
//     </div>
// }