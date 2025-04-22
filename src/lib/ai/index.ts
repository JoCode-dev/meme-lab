import { InferenceClient } from "@huggingface/inference";

const hf = new InferenceClient(process.env.NEXT_PUBLIC_HUGGINGFACE_API_KEY!);

export const generateImage = async (prompt: string) => {
  const image = await hf.textToImage({
    provider: "replicate",
    model: "black-forest-labs/Flux.1-dev",
    inputs: prompt,
  })

  return image;
};
