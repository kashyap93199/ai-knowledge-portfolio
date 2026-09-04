import type { Project, Resource, GlossaryTerm, ContactMessage } from "@/types";

// ---------------------------------------------------------------------------
// Projects (6)
// ---------------------------------------------------------------------------

export const projects: Omit<Project, "id" | "createdAt" | "updatedAt">[] = [
  {
    title: "AI Chatbot Interface",
    slug: "ai-chatbot-interface",
    summary:
      "A polished, accessible chat interface for talking to a local open-source language model — no paid API required.",
    problem:
      "Most chatbot demos depend on paid APIs or proprietary services. Students and hobbyists need a clean reference implementation that works fully offline with open-weight models.",
    solution:
      "Built a responsive chat UI with streaming responses, message history, markdown rendering, and a local model backend via Ollama. The interface treats the model as a pluggable service so any OpenAI-compatible endpoint can be swapped in.",
    features:
      "Streaming token-by-token responses\nPersistent conversation history (SQLite)\nMarkdown and code highlighting\nKeyboard-first navigation and screen-reader labels\nModel switching and temperature controls",
    techStack: "Next.js · TypeScript · Tailwind CSS · Ollama (local LLM) · SQLite",
    category: "Generative AI",
    tags: "LLM|Chat|TypeScript|Local-first",
    imageUrl: null,
    demoUrl: "https://example.com/demo/ai-chatbot",
    repositoryUrl: "https://github.com/your-username/ai-chatbot-interface",
    order: 1,
    featured: true,
  },
  {
    title: "Image Classification Explorer",
    slug: "image-classification-explorer",
    summary:
      "An interactive playground that classifies uploaded images with a pretrained neural network and explains every prediction.",
    problem:
      "Learning computer vision is hard when libraries hide what is happening. Beginners need a tool that shows not just results, but why the model thinks what it thinks.",
    solution:
      "Built a browser app that runs a lightweight ImageNet-classified model (MobileNet) via TensorFlow.js entirely in the browser. Every prediction includes the top classes, confidence bars, and a plain-language explanation of how a convolutional network processes the image.",
    features:
      "Drag-and-drop image upload, processed locally\nTop-5 predictions with confidence bars\nLayer-by-layer visual explanation mode\nPre-trained MobileNet — no training required\nWorks offline after first load",
    techStack: "Next.js · TypeScript · TensorFlow.js · Tailwind CSS",
    category: "Computer Vision",
    tags: "Vision|TensorFlow.js|Education|On-device",
    imageUrl: null,
    demoUrl: "https://example.com/demo/image-explorer",
    repositoryUrl: "https://github.com/your-username/image-classification-explorer",
    order: 2,
    featured: true,
  },
  {
    title: "Sentiment Analysis Dashboard",
    slug: "sentiment-analysis-dashboard",
    summary:
      "A full-stack dashboard that scores text sentiment, aggregates results over time, and visualizes trends with charts.",
    problem:
      "Businesses receive thousands of open-ended survey responses and reviews. Reading them all is impractical; summarizing the sentiment reliably is a classic NLP task worth demonstrating end to end.",
    solution:
      "Built an NLP pipeline that classifies reviews and survey responses as positive, neutral, or negative using a transformer model, stores results in SQLite, and renders time-series, category, and word-cloud visualizations on a responsive dashboard.",
    features:
      "Batch CSV import with validation\nPer-item sentiment scores and confidence\nTrend charts, category breakdowns, and word clouds\nFull-text search over imported responses\nExportable result reports",
    techStack: "Next.js · TypeScript · Hugging Face Transformers (Python worker) · SQLite · Chart.js",
    category: "NLP",
    tags: "NLP|Dashboard|Data-viz|Transformers",
    imageUrl: null,
    demoUrl: "https://example.com/demo/sentiment-dashboard",
    repositoryUrl: "https://github.com/your-username/sentiment-dashboard",
    order: 3,
    featured: false,
  },
  {
    title: "AI Resume Analyzer",
    slug: "ai-resume-analyzer",
    summary:
      "A concept app that parses resumes, extracts skills and experience, and scores them against a job description.",
    problem:
      "Tailoring a resume to a job posting is tedious, and keyword-matching tools give shallow feedback. Job seekers need concrete, explainable suggestions grounded in the actual job description.",
    solution:
      "A full-stack concept app that parses uploaded resumes, extracts structured entities (skills, roles, years of experience), computes an explainable match score against a target job description, and returns actionable suggestions with the reasoning for each one.",
    features:
      "PDF and text resume parsing\nSkill extraction and gap detection\nExplainable match score (not a black box)\nSuggestion list with line-item reasoning\nPrivacy-first: files processed locally",
    techStack: "Next.js · TypeScript · Python NLP worker · SQLite · Tailwind CSS",
    category: "NLP",
    tags: "Concept|HR-tech|Explainability|Parsing",
    imageUrl: null,
    demoUrl: "https://example.com/demo/resume-analyzer",
    repositoryUrl: "https://github.com/your-username/resume-analyzer",
    order: 4,
    featured: false,
  },
  {
    title: "Neural Network Visualizer",
    slug: "neural-network-visualizer",
    summary:
      "A WebGL-powered playground that renders a live neural network and shows how activations and weights change during training.",
    problem:
      "Neural networks are abstract, and textbook diagrams are static. Learners understand backpropagation and feature learning far better when they can watch a network learn in real time.",
    solution:
      "Built a 3D visualization with Three.js that renders a configurable network (layers, width, activation), trains it on toy datasets in the browser, and animates activation values, gradients, and weight strengths as they evolve — with controls to pause, reset, or alter the architecture.",
    features:
      "Interactive 3D network graph with WebGL\nLive training on XOR, circles, and moons datasets\nAnimated activations and weight heat\nArchitecture editor with auto-relayout\nReduced-motion fallback to 2D canvas",
    techStack: "Next.js · TypeScript · Three.js / React Three Fiber · TensorFlow.js",
    category: "Deep Learning",
    tags: "3D|Education|WebGL|Visualization",
    imageUrl: null,
    demoUrl: "https://example.com/demo/nn-visualizer",
    repositoryUrl: "https://github.com/your-username/neural-network-visualizer",
    order: 5,
    featured: true,
  },
  {
    title: "AI Ethics Learning Hub",
    slug: "ai-ethics-learning-hub",
    summary:
      "An interactive learning module covering bias, privacy, transparency, and accountability, with real case studies and quizzes.",
    problem:
      "AI ethics is usually discussed in dense papers and news articles. Learners need an interactive, structured introduction with concrete cases they can engage with.",
    solution:
      "Designed a self-paced learning hub with interactive cards for each ethical theme, real-world case studies, scenario-based decision exercises, and knowledge checks. All content is original, beginner-friendly, and cites freely available sources.",
    features:
      "Structured modules: bias, privacy, transparency, accountability\nInteractive scenario quizzes with explanations\nCase-study library with discussion prompts\nProgress tracking via local storage\nFully static — no tracking or accounts required",
    techStack: "Next.js · TypeScript · Tailwind CSS · Framer Motion",
    category: "AI Ethics",
    tags: "Ethics|Education|Interactive|Accessible",
    imageUrl: null,
    demoUrl: "https://example.com/demo/ethics-hub",
    repositoryUrl: "https://github.com/your-username/ai-ethics-hub",
    order: 6,
    featured: false,
  },
];

// ---------------------------------------------------------------------------
// Resources (20)
// ---------------------------------------------------------------------------

export const resources: Omit<Resource, "id" | "createdAt" | "updatedAt">[] = [
  {
    title: "Elements of AI",
    url: "https://www.elementsofai.com",
    category: "Beginner Guides",
    description:
      "A free online course from the University of Helsinki introducing what AI is, what it can and cannot do, and how it affects society. No math or programming required.",
    license: "Free course (CC BY-NC-SA 4.0 content)",
    level: "Beginner",
  },
  {
    title: "Kaggle Learn",
    url: "https://www.kaggle.com/learn",
    category: "Beginner Guides",
    description:
      "Short, hands-on micro-courses covering Python, machine learning, data visualization, and more — with in-browser exercises and real datasets.",
    license: "Free to use",
    level: "Beginner",
  },
  {
    title: "Google Machine Learning Crash Course",
    url: "https://developers.google.com/machine-learning/crash-course",
    category: "Machine Learning",
    description:
      "Google’s free introduction to machine learning: lessons, visualizations, and exercises covering core concepts from loss functions to embeddings.",
    license: "Free to use",
    level: "Beginner",
  },
  {
    title: "scikit-learn User Guide",
    url: "https://scikit-learn.org/stable/user_guide.html",
    category: "Machine Learning",
    description:
      "The official, deeply practical documentation for Python’s most popular classical ML library — supervised and unsupervised learning with worked examples.",
    license: "BSD-3-Clause",
    level: "Intermediate",
  },
  {
    title: "Stanford CS229 Lecture Notes",
    url: "https://cs229.stanford.edu/lectures-spring2022/main_notes.pdf",
    category: "Machine Learning",
    description:
      "Comprehensive free lecture notes from Stanford’s famous machine learning course, covering the math and algorithms behind core ML methods.",
    license: "Free educational material",
    level: "Advanced",
  },
  {
    title: "MIT 6.S191: Introduction to Deep Learning",
    url: "https://introtodeeplearning.com",
    category: "Deep Learning",
    description:
      "MIT’s open deep learning course with recorded lectures, slides, and labs covering neural networks, CNNs, RNNs, transformers, and more.",
    license: "Free course materials",
    level: "Intermediate",
  },
  {
    title: "PyTorch Official Tutorials",
    url: "https://pytorch.org/tutorials/",
    category: "Deep Learning",
    description:
      "The official PyTorch learning path — from tensors to training a transformer — with runnable notebooks and GPU-ready colab links.",
    license: "BSD-3-Clause",
    level: "Intermediate",
  },
  {
    title: "3Blue1Brown — Neural Networks",
    url: "https://www.3blue1brown.com/topics/neural-networks",
    category: "Deep Learning",
    description:
      "A celebrated animated video series that builds intuition for gradient descent and backpropagation from first principles.",
    license: "Free (YouTube)",
    level: "Beginner",
  },
  {
    title: "Hugging Face NLP Course",
    url: "https://huggingface.co/learn/nlp-course",
    category: "NLP",
    description:
      "A free, practical course on modern NLP with transformers: tokenization, fine-tuning, pipelines, and deployment using the Hugging Face ecosystem.",
    license: "Apache-2.0",
    level: "Intermediate",
  },
  {
    title: "Stanford CS224n: Natural Language Processing",
    url: "https://web.stanford.edu/class/cs224n/",
    category: "NLP",
    description:
      "Stanford’s NLP course with free lecture videos, slides, and assignments covering everything from word vectors to attention and language models.",
    license: "Free course materials",
    level: "Advanced",
  },
  {
    title: "NLTK Book — Natural Language Processing with Python",
    url: "https://www.nltk.org/book/",
    category: "NLP",
    description:
      "The classic free online textbook for practical NLP in Python, covering tokenization, tagging, parsing, and semantic analysis.",
    license: "CC BY-NC-ND 3.0",
    level: "Beginner",
  },
  {
    title: "Stanford CS231n: Convolutional Neural Networks for Visual Recognition",
    url: "https://cs231n.stanford.edu",
    category: "Computer Vision",
    description:
      "The definitive free course on deep learning for vision: free notes, assignments, and lectures covering CNNs and modern architectures.",
    license: "Free course materials",
    level: "Advanced",
  },
  {
    title: "OpenCV Official Tutorials",
    url: "https://docs.opencv.org/4.x/d9/df8/tutorial_root.html",
    category: "Computer Vision",
    description:
      "The official guide to OpenCV, the most widely used open-source computer vision library — image processing, feature detection, and video analysis.",
    license: "Apache-2.0",
    level: "Intermediate",
  },
  {
    title: "Hugging Face LLM Course",
    url: "https://huggingface.co/learn/llm-course",
    category: "Generative AI",
    description:
      "A free, comprehensive course on large language models: prompt engineering, fine-tuning, RLHF, quantization, and building LLM applications.",
    license: "Apache-2.0",
    level: "Intermediate",
  },
  {
    title: "Hugging Face Diffusers Documentation",
    url: "https://huggingface.co/docs/diffusers",
    category: "Generative AI",
    description:
      "The official docs for the open-source Diffusers library — training and running diffusion models for image generation on your own hardware.",
    license: "Apache-2.0",
    level: "Intermediate",
  },
  {
    title: "Moral Machine",
    url: "https://www.moralmachine.net",
    category: "Ethics",
    description:
      "MIT’s interactive experiment exploring the moral decisions autonomous vehicles must make — a great conversation starter for AI ethics.",
    license: "Free to use",
    level: "Beginner",
  },
  {
    title: "Montreal AI Ethics Institute",
    url: "https://montrealethics.ai",
    category: "Ethics",
    description:
      "Free articles, newsletters, and resources covering fairness, accountability, transparency, and ethics in machine learning.",
    license: "Free to use",
    level: "Intermediate",
  },
  {
    title: "Kaggle Datasets",
    url: "https://www.kaggle.com/datasets",
    category: "Datasets",
    description:
      "Tens of thousands of community datasets with licenses clearly stated, covering every imaginable ML domain — great for practice projects.",
    license: "Varies (check each dataset)",
    level: "Beginner",
  },
  {
    title: "Hugging Face Datasets",
    url: "https://huggingface.co/datasets",
    category: "Datasets",
    description:
      "The open hub of datasets for ML research, including popular benchmarks for NLP, vision, and audio, with a simple Python API.",
    license: "Varies (check each dataset)",
    level: "Intermediate",
  },
  {
    title: "arXiv",
    url: "https://arxiv.org",
    category: "Research Papers",
    description:
      "The free preprint server where nearly all AI research is published first — search cs.AI, cs.LG, and cs.CL for the latest papers.",
    license: "Open access",
    level: "Advanced",
  },
  {
    title: "Papers with Code",
    url: "https://paperswithcode.com",
    category: "Research Papers",
    description:
      "Research papers paired with their code implementations and benchmark leaderboards — the fastest way to go from paper to running model.",
    license: "Free to use",
    level: "Intermediate",
  },
  {
    title: "PyTorch",
    url: "https://pytorch.org",
    category: "Open-source Tools",
    description:
      "The leading open-source deep learning framework, backed by the PyTorch Foundation. Free to use under a permissive license.",
    license: "BSD-3-Clause",
    level: "Intermediate",
  },
  {
    title: "Hugging Face Transformers",
    url: "https://github.com/huggingface/transformers",
    category: "Open-source Tools",
    description:
      "The standard library for pretrained transformer models — thousands of open models for text, vision, and audio, one API.",
    license: "Apache-2.0",
    level: "Intermediate",
  },
  {
    title: "spaCy",
    url: "https://spacy.io",
    category: "Open-source Tools",
    description:
      "Fast, production-ready NLP in Python with pretrained pipelines for 70+ languages. Free under the MIT license.",
    license: "MIT",
    level: "Intermediate",
  },
];

// ---------------------------------------------------------------------------
// Glossary (20 terms)
// ---------------------------------------------------------------------------

export const glossaryTerms: Omit<GlossaryTerm, "id" | "createdAt" | "updatedAt">[] = [
  {
    term: "Artificial Intelligence",
    slug: "artificial-intelligence",
    simpleDefinition:
      "The field of computer science that builds machines capable of tasks that normally require human intelligence.",
    detailedDefinition:
      "Artificial intelligence (AI) is a broad field concerned with creating systems that perceive, reason, learn, and act. It spans everything from rule-based programs to self-learning neural networks. Modern AI is mostly “narrow”: systems excel at specific tasks like translation or image recognition but do not possess general human-like understanding. General AI that matches human cognitive flexibility remains a long-term research goal.",
    category: "Foundations",
    relatedTerms: "Machine Learning|Deep Learning|Neural Network",
  },
  {
    term: "Machine Learning",
    slug: "machine-learning",
    simpleDefinition:
      "Algorithms that improve at a task by learning patterns from data, without being explicitly programmed for every case.",
    detailedDefinition:
      "Machine learning (ML) is a subset of AI where systems learn from experience (data) rather than from hand-coded rules. During training, an ML algorithm adjusts its internal parameters to reduce prediction error on example data. The three main paradigms are supervised learning (learning from labeled examples), unsupervised learning (finding structure in unlabeled data), and reinforcement learning (learning from rewards).",
    category: "Foundations",
    relatedTerms: "Training|Model|Supervised Learning",
  },
  {
    term: "Neural Network",
    slug: "neural-network",
    simpleDefinition:
      "A computing system inspired by the brain: layers of connected units that learn patterns from data.",
    detailedDefinition:
      "A neural network is composed of layers of artificial neurons, each of which computes a weighted sum of its inputs, applies a nonlinear activation, and passes the result forward. During training, backpropagation adjusts the weights so the network’s outputs move closer to the desired outputs. Neural networks are the engine behind most modern AI: vision, speech, language, and games.",
    category: "Deep Learning",
    relatedTerms: "Deep Learning|Backpropagation|Activation Function",
  },
  {
    term: "Deep Learning",
    slug: "deep-learning",
    simpleDefinition:
      "Machine learning using neural networks with many layers to learn hierarchical representations of data.",
    detailedDefinition:
      "Deep learning trains neural networks with many hidden layers, letting them learn features at multiple levels of abstraction — edges, then shapes, then objects in vision, for example. It requires large datasets and significant compute, but it outperforms classical methods on raw signals such as images, audio, and text, and powers systems from voice assistants to self-driving cars.",
    category: "Deep Learning",
    relatedTerms: "Neural Network|Convolutional Neural Network|Transformer",
  },
  {
    term: "Dataset",
    slug: "dataset",
    simpleDefinition:
      "A collection of examples used to train, validate, and test a machine learning model.",
    detailedDefinition:
      "A dataset is the raw material of machine learning. It is usually split into a training set (what the model learns from), a validation set (used to tune hyperparameters), and a test set (unseen data used for final evaluation). Dataset quality — accuracy, coverage, labeling consistency, and representativeness — directly determines model quality. Poor or biased datasets produce poor or biased models.",
    category: "Data",
    relatedTerms: "Training|Test Set|Bias",
  },
  {
    term: "Training",
    slug: "training",
    simpleDefinition:
      "The process of adjusting a model’s parameters so its predictions match the training data.",
    detailedDefinition:
      "Training runs the learning loop: the model predicts on batches of data, a loss function scores the errors, and an optimizer updates the parameters to reduce that loss. Training proceeds in epochs — full passes over the data — and is monitored on validation data to avoid overfitting. The output of training is a trained model with fixed parameters, ready for inference.",
    category: "Core Concepts",
    relatedTerms: "Epoch|Loss Function|Optimizer",
  },
  {
    term: "Inference",
    slug: "inference",
    simpleDefinition:
      "Using a trained model to make predictions on new, unseen data.",
    detailedDefinition:
      "Inference is the deployment phase of machine learning: a trained model receives a new input (an image, a sentence, a row of numbers) and produces a prediction. Unlike training, inference does not change the model’s parameters. Inference speed and latency matter in production, which is why models are often optimized, quantized, or compiled before serving.",
    category: "Core Concepts",
    relatedTerms: "Training|Model|Deployment",
  },
  {
    term: "Tokenization",
    slug: "tokenization",
    simpleDefinition:
      "Splitting text into smaller pieces — tokens — that a language model can process.",
    detailedDefinition:
      "Tokenization converts raw text into a sequence of tokens. Tokens are usually subword units (like “play”, “ing”, or “er”) rather than whole words, which lets models handle vocabulary efficiently. The tokenizer defines the model’s vocabulary, and models are sensitive to it: the same text can tokenize differently across models. Token counts also drive context limits and usage estimates.",
    category: "NLP",
    relatedTerms: "Transformer|Prompt|Large Language Model",
  },
  {
    term: "Transformer",
    slug: "transformer",
    simpleDefinition:
      "A neural network architecture based on self-attention, introduced in 2017, that powers most modern AI systems.",
    detailedDefinition:
      "The Transformer processes sequences using self-attention, which lets every token directly attend to every other token — capturing long-range relationships far better than earlier recurrent models. It scales to enormous sizes and trains efficiently on parallel hardware. Transformers underlie large language models like GPT, vision models like ViT, and multimodal systems.",
    category: "NLP",
    relatedTerms: "Attention|Tokenization|Large Language Model",
  },
  {
    term: "Prompt",
    slug: "prompt",
    simpleDefinition:
      "The input text you give a generative model to instruct what it should produce.",
    detailedDefinition:
      "A prompt is the instruction or context provided to a generative AI model. Prompt quality dramatically affects output quality: clear, specific prompts with examples (“few-shot”) produce far better results than vague ones. Prompt engineering — the practice of designing effective prompts — has become a core skill for working with LLMs.",
    category: "Generative AI",
    relatedTerms: "Large Language Model|Inference|Hallucination",
  },
  {
    term: "Model",
    slug: "model",
    simpleDefinition:
      "A trained mathematical function that maps inputs to predictions.",
    detailedDefinition:
      "In machine learning, a model is the result of training: a function with learned parameters that takes an input and produces an output — a class label, a number, or generated content. Models vary in size from small linear regressions to trillion-parameter language models. A model is only as good as its training data, architecture, and evaluation.",
    category: "Core Concepts",
    relatedTerms: "Training|Inference|Parameters",
  },
  {
    term: "Algorithm",
    slug: "algorithm",
    simpleDefinition:
      "A step-by-step procedure for solving a problem or performing a computation.",
    detailedDefinition:
      "An algorithm is a finite sequence of well-defined instructions. In AI, algorithms include learning procedures (gradient descent, backpropagation), search methods (A*, Monte Carlo tree search), and inference routines. An AI system is a combination of algorithms; the distinction matters because a model is the learned artifact, while an algorithm is the process that produced or uses it.",
    category: "Foundations",
    relatedTerms: "Model|Training|Optimizer",
  },
  {
    term: "Overfitting",
    slug: "overfitting",
    simpleDefinition:
      "When a model memorizes the training data and fails to generalize to new data.",
    detailedDefinition:
      "Overfitting happens when a model is too complex for the amount of data — it fits the noise and quirks of the training set rather than the underlying pattern. The signature is excellent training performance with poor validation or test performance. It is fought with more data, simpler models, regularization, dropout, and early stopping.",
    category: "Core Concepts",
    relatedTerms: "Underfitting|Validation Set|Regularization",
  },
  {
    term: "Underfitting",
    slug: "underfitting",
    simpleDefinition:
      "When a model is too simple to capture the pattern in the data, performing poorly even on training data.",
    detailedDefinition:
      "Underfitting occurs when a model lacks the capacity to learn the relationship in the data — for example, fitting a straight line to a curved pattern. Both training and test performance are poor. The remedy is a more expressive model, better features, or more training. Finding the balance between underfitting and overfitting is the central art of model development.",
    category: "Core Concepts",
    relatedTerms: "Overfitting|Bias-Variance Tradeoff|Capacity",
  },
  {
    term: "Bias",
    slug: "bias",
    simpleDefinition:
      "Systematic error in a model’s predictions, often reflecting unfair patterns in the data or the design.",
    detailedDefinition:
      "In machine learning, bias appears in two senses. Statistically, it is the error introduced by simplifying assumptions (a linear model is “biased” about a nonlinear world). Ethically, it is systematic unfairness: a model may perform worse for certain demographic groups because the training data under-represents them, labels encode prejudice, or the metric ignores equity. Mitigating harmful bias requires auditing data, metrics, and outcomes across groups.",
    category: "Ethics",
    relatedTerms: "Fairness|Dataset|Evaluation",
  },
  {
    term: "Ethics",
    slug: "ethics",
    simpleDefinition:
      "The principles governing the responsible development and use of AI systems.",
    detailedDefinition:
      "AI ethics concerns how systems are built and used responsibly: avoiding harm and bias, respecting privacy, being transparent about capabilities and limits, keeping humans accountable, and ensuring oversight of consequential decisions. Ethics is practical — it involves data audits, model documentation, impact assessments, and design choices throughout the pipeline, not just policy statements.",
    category: "Ethics",
    relatedTerms: "Bias|Privacy|Transparency",
  },
  {
    term: "Computer Vision",
    slug: "computer-vision",
    simpleDefinition:
      "The field of AI that lets machines interpret images and video.",
    detailedDefinition:
      "Computer vision builds systems that extract meaning from visual data. Core tasks include classification (what is this?), detection (where are the objects?), segmentation (which pixels belong to what?), and generation. Convolutional networks and vision transformers dominate the field, which powers photography, medicine, manufacturing, and autonomous vehicles.",
    category: "Vision",
    relatedTerms: "Convolutional Neural Network|Image Classification|Object Detection",
  },
  {
    term: "Natural Language Processing",
    slug: "natural-language-processing",
    simpleDefinition:
      "The field of AI that enables computers to understand and generate human language.",
    detailedDefinition:
      "Natural language processing (NLP) combines linguistics, computer science, and AI to work with text and speech. Applications include translation, summarization, question answering, sentiment analysis, and chatbots. Modern NLP is built on transformer-based language models trained on massive text corpora, achieving human-level results on many benchmarks while still struggling with reasoning, factual reliability, and nuance.",
    category: "NLP",
    relatedTerms: "Transformer|Tokenization|Large Language Model",
  },
  {
    term: "Reinforcement Learning",
    slug: "reinforcement-learning",
    simpleDefinition:
      "A learning method where an agent learns by taking actions and maximizing rewards over time.",
    detailedDefinition:
      "Reinforcement learning (RL) frames problems as an agent interacting with an environment: observe state, choose action, receive reward, repeat. The agent learns a policy that maximizes cumulative reward. RL famously mastered Go and chess beyond human level and is used in robotics, games, chip design, and recommendation. Its challenges include sample inefficiency, exploration, and safe deployment in the real world.",
    category: "Core Concepts",
    relatedTerms: "Agent|Policy|Reward",
  },
  {
    term: "Generative AI",
    slug: "generative-ai",
    simpleDefinition:
      "AI systems that create new content — text, images, audio, or code — rather than only classifying or predicting.",
    detailedDefinition:
      "Generative AI models learn the distribution of their training data and sample from it to produce novel output. Families include large language models (text), diffusion models (images and audio), and GANs. Generative systems enable writing assistants, image generators, and synthetic data — and raise challenges around hallucination, copyright, bias, and misuse that require human oversight.",
    category: "Generative AI",
    relatedTerms: "Large Language Model|Diffusion Model|Prompt",
  },
  {
    term: "Hallucination",
    slug: "hallucination",
    simpleDefinition:
      "When a generative model confidently produces false or fabricated information.",
    detailedDefinition:
      "Hallucination describes outputs that are fluent and plausible but factually wrong or invented — citations to papers that do not exist, confident answers to unanswerable questions, or fabricated events. It happens because language models generate likely text rather than retrieving verified facts. Mitigations include retrieval augmentation, verification steps, and designing systems that express uncertainty.",
    category: "Generative AI",
    relatedTerms: "Large Language Model|Prompt|Inference",
  },
];

// ---------------------------------------------------------------------------
// Sample contact message (for testing the admin area)
// ---------------------------------------------------------------------------

export const sampleContactMessage: Omit<ContactMessage, "id" | "createdAt" | "updatedAt"> = {
  name: "Sample Visitor",
  email: "visitor@example.com",
  subject: "Love the interactive AI workflow experience",
  message:
    "This is a sample message included by the seed script so you can test the contact form storage and the admin message inbox right away. Delete it from the admin panel once you are done testing.",
  status: "new",
};