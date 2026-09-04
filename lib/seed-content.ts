import type { SiteSetting, AiTopic, WorkflowStep, TimelineEvent } from "@/types";

// ---------------------------------------------------------------------------
// Site settings
// ---------------------------------------------------------------------------

export const siteSettings: Pick<SiteSetting, "key" | "value">[] = [
  {
    key: "siteTitle",
    value: "AI Knowledge Portfolio",
  },
  {
    key: "siteDescription",
    value:
      "An immersive, interactive portfolio exploring Artificial Intelligence through design, data, and 3D.",
  },
  {
    key: "heroTitle",
    value: "Exploring Artificial Intelligence Through Design, Data, and 3D.",
  },
  {
    key: "heroSubtitle",
    value:
      "An interactive portfolio experience explaining AI concepts, workflows, technologies, and future possibilities — built with open-source tools only.",
  },
  {
    key: "heroEyebrow",
    value: "Interactive AI Learning Experience",
  },
  {
    key: "contactEmail",
    value: "hello@example.com",
  },
  {
    key: "footerNote",
    value:
      "Built with Next.js, TypeScript, Tailwind CSS, Three.js, and SQLite — using only free and open-source tools.",
  },
  {
    key: "socialGithub",
    value: "https://github.com/your-username",
  },
  {
    key: "socialLinkedin",
    value: "https://www.linkedin.com/in/your-username",
  },
  {
    key: "socialTwitter",
    value: "https://twitter.com/your-username",
  },
];

// ---------------------------------------------------------------------------
// AI domains (10)
// ---------------------------------------------------------------------------

export const topics: Omit<AiTopic, "id" | "createdAt" | "updatedAt">[] = [
  {
    name: "Machine Learning",
    slug: "machine-learning",
    shortDefinition:
      "The branch of AI where computers learn patterns from data instead of following hand-written rules.",
    longDescription:
      "Machine learning (ML) is the study of algorithms that improve automatically through experience. Rather than a programmer writing explicit instructions for every situation, an ML system is given data and a learning objective, and it discovers the underlying patterns for itself.\n\nML is usually divided into three paradigms. In supervised learning, the model learns from labeled examples, such as photos tagged with the object they contain. In unsupervised learning, the model finds structure in unlabeled data, such as grouping customers by behavior. In reinforcement learning, an agent learns by taking actions and receiving rewards or penalties.\n\nThe field powers spam filters, fraud detection, medical diagnosis support, demand forecasting, and countless other everyday systems. Its central challenge is generalization: building models that perform well not just on the data they were trained on, but on new, unseen data.",
    examples:
      "Email spam filtering\nCredit card fraud detection\nHouse price prediction\nCustomer churn prediction\nMedical diagnosis support",
    tools:
      "scikit-learn\nXGBoost\nPyTorch\nTensorFlow\nPandas and NumPy\nJupyter Notebooks",
    freeResources:
      "scikit-learn user guide: https://scikit-learn.org/stable/user_guide.html\nElements of AI: https://www.elementsofai.com\nKaggle Learn: https://www.kaggle.com/learn\nStanford CS229 notes: https://cs229.stanford.edu/lectures-spring2022/main_notes.pdf",
    icon: "network",
    order: 1,
    featured: true,
  },
  {
    name: "Deep Learning",
    slug: "deep-learning",
    shortDefinition:
      "A subset of machine learning that uses multi-layered neural networks to learn hierarchical representations of data.",
    longDescription:
      "Deep learning uses artificial neural networks with many stacked layers, which is why it is called “deep.” Each layer transforms its input into a slightly more abstract representation: a vision network might first detect edges, then shapes, then object parts, and finally whole objects.\n\nThe approach became dominant around 2012, when a deep network called AlexNet crushed previous results in an image recognition competition. Two ingredients made this possible: large datasets and fast parallel hardware (GPUs).\n\nDeep learning excels at raw signals — images, audio, text, and video — where it outperforms classical methods because it learns its own features instead of relying on hand-crafted ones. Its trade-offs are high computational cost, large data requirements, and less transparency: it is often hard to explain exactly why a deep network made a decision.",
    examples:
      "Image recognition and object detection\nSpeech-to-text systems\nMachine translation\nMedical imaging analysis\nAutonomous driving perception",
    tools:
      "PyTorch\nTensorFlow / Keras\nJAX\nONNX Runtime\nCUDA / GPU tooling",
    freeResources:
      "PyTorch official tutorials: https://pytorch.org/tutorials/\nMIT 6.S191: https://introtodeeplearning.com\n3Blue1Brown neural networks series: https://www.3blue1brown.com/topics/neural-networks\nfast.ai: https://course.fast.ai",
    icon: "brain",
    order: 2,
    featured: true,
  },
  {
    name: "Natural Language Processing",
    slug: "natural-language-processing",
    shortDefinition:
      "NLP gives computers the ability to understand, interpret, and generate human language.",
    longDescription:
      "Natural language processing (NLP) sits at the intersection of linguistics, computer science, and AI. It covers everything from splitting text into tokens to translating between languages, answering questions, summarizing documents, and holding conversations.\n\nEarly NLP relied on rules and statistical models over word counts. Modern NLP is dominated by neural models, especially transformers, which learn rich representations of words from context. The same technology underlies the large language models (LLMs) that power chatbots and writing assistants.\n\nNLP remains hard because human language is ambiguous, idiomatic, and endlessly creative. A model must handle sarcasm, named entities, pronouns that refer back to earlier clauses, and meaning that depends on the real world. Despite the challenges, NLP now underpins search engines, translation, accessibility tools, and virtual assistants used by billions of people.",
    examples:
      "Machine translation (e.g., English to Japanese)\nSentiment analysis of product reviews\nText summarization\nNamed entity recognition\nChatbots and virtual assistants",
    tools:
      "spaCy\nHugging Face Transformers\nNLTK\nStanford CoreNLP\nGensim",
    freeResources:
      "Hugging Face NLP Course: https://huggingface.co/learn/nlp-course\nStanford CS224n: https://web.stanford.edu/class/cs224n/\nNLTK book (free online): https://www.nltk.org/book/\nspaCy 101: https://spacy.io/usage/spacy-101",
    icon: "message-square",
    order: 3,
    featured: true,
  },
  {
    name: "Computer Vision",
    slug: "computer-vision",
    shortDefinition:
      "The field of AI that enables machines to interpret and understand visual information from images and video.",
    longDescription:
      "Computer vision gives machines the ability to “see.” It processes pixels and turns them into meaningful information: what objects are present, where they are, whether a face is smiling, or whether an X-ray shows an anomaly.\n\nKey tasks include image classification (what is this?), object detection (where are the objects and what are they?), segmentation (which pixels belong to which object?), and image generation. Convolutional neural networks (CNNs) have been the workhorse of vision since 2012, and transformer-based vision models are now a strong alternative.\n\nVision systems are deployed everywhere: in smartphone cameras for portrait modes, in quality control on factory lines, in medical imaging, in self-driving cars, and in accessibility tools that describe scenes to people with visual impairments. The main challenges are robustness to lighting and viewpoint changes, privacy concerns around surveillance, and the cost of labeling large datasets.",
    examples:
      "Facial recognition and verification\nAutonomous vehicle perception\nMedical image analysis (X-rays, MRIs)\nOCR (reading text from images)\nAugmented reality tracking",
    tools:
      "OpenCV\nPyTorch / torchvision\nTensorFlow\nUltralytics YOLO\nscikit-image",
    freeResources:
      "Stanford CS231n: https://cs231n.stanford.edu\nOpenCV official tutorials: https://docs.opencv.org/4.x/d9/df8/tutorial_root.html\nPyImageSearch tutorials: https://pyimagesearch.com\nFastAI vision course: https://course.fast.ai",
    icon: "scan-eye",
    order: 4,
    featured: false,
  },
  {
    name: "Robotics",
    slug: "robotics",
    shortDefinition:
      "The engineering and science of machines that sense, plan, and act in the physical world — increasingly powered by AI.",
    longDescription:
      "Robotics combines mechanical engineering, electronics, and AI to build machines that interact with the physical world. A robot must perceive its surroundings with sensors, decide what to do next, and execute precise movements with actuators — all in real time.\n\nAI plays an increasingly central role. Machine learning helps robots recognize objects and people, reinforcement learning teaches them manipulation skills through trial and error, and modern approaches use large models to ground language in physical action (“pick up the red cup”).\n\nRobots work on factory assembly lines, in warehouses moving parcels, in hospitals assisting surgery, and in homes vacuuming floors. Field robots explore other planets and inspect dangerous infrastructure. The frontier is general-purpose robots that can handle many tasks in unstructured human environments rather than a single repetitive routine.",
    examples:
      "Warehouse picking robots\nSurgical assistance systems\nAutonomous drones and rovers\nHumanoid research platforms\nAgricultural harvesting robots",
    tools:
      "ROS (Robot Operating System)\nGazebo simulator\nOpenCV\nPyTorch for robot learning\nMuJoCo (physics simulation)",
    freeResources:
      "ROS 2 tutorials: https://docs.ros.org/en/rolling/Tutorials.html\nThe Construct (free courses): https://www.theconstructsim.com\nMuJoCo documentation: https://mujoco.org\nAwesome Robotics list: https://github.com/kiloreux/awesome-robotics",
    icon: "bot",
    order: 5,
    featured: false,
  },
  {
    name: "Generative AI",
    slug: "generative-ai",
    shortDefinition:
      "AI systems that create new content — text, images, audio, video, and code — by learning the patterns of their training data.",
    longDescription:
      "Generative AI refers to models that produce original output rather than simply classifying or predicting a label. Given a prompt or a seed, a generative model samples from the probability distribution it learned during training to produce something new: a paragraph, an image, a melody, or a program.\n\nThe modern era of generative AI began with generative adversarial networks (GANs) for images, then variational autoencoders, diffusion models, and finally large language models and multimodal systems that can accept images, audio, and text as input.\n\nGenerative AI is transforming creative work, software development, and education — but it also raises serious questions. Models can hallucinate plausible-sounding falsehoods, amplify biases present in their training data, and be used to create convincing misinformation. Understanding what these systems can and cannot do is essential for using them responsibly.",
    examples:
      "Writing assistants (essays, emails, code)\nText-to-image generation (diffusion models)\nVoice cloning and text-to-speech\nMusic and video generation\nSynthetic data for training other models",
    tools:
      "Hugging Face Transformers & Diffusers\nStable Diffusion (open weights)\nLangChain / LlamaIndex\nOllama (local LLMs)\nComfyUI",
    freeResources:
      "Hugging Face LLM Course: https://huggingface.co/learn/llm-course\nHugging Face Diffusers docs: https://huggingface.co/docs/diffusers\nGoogle Generative AI learning path: https://ai.google.dev/learn\nDeepLearning.AI short courses: https://www.deeplearning.ai/short-courses/",
    icon: "sparkles",
    order: 6,
    featured: true,
  },
  {
    name: "Reinforcement Learning",
    slug: "reinforcement-learning",
    shortDefinition:
      "A learning paradigm where an agent discovers good behavior by interacting with an environment and maximizing cumulative reward.",
    longDescription:
      "Reinforcement learning (RL) is learning by trial and error. An agent observes a state, takes an action, and receives a reward signal. Over many episodes, it learns a policy — a mapping from situations to actions — that maximizes the total reward it collects.\n\nThe field gained public attention in 2016 when AlphaGo defeated a world champion at Go, a game so complex that exhaustive search was impossible. RL now plays a role in robotics, game-playing, chip design, recommendation, and traffic control.\n\nTwo families of algorithms dominate: value-based methods like Deep Q-Networks, which learn how good each action is in each state, and policy-gradient methods, which directly optimize the policy. A central difficulty is the exploration-exploitation trade-off: the agent must try new actions to learn about them while still exploiting what it already knows works.",
    examples:
      "Game playing (Go, chess, Atari)\nRobot manipulation skills\nAutonomous driving policies\nDynamic pricing and ad bidding\nDatacenter cooling optimization",
    tools:
      "Gymnasium (OpenAI Gym fork)\nStable-Baselines3\nRay RLlib\nUnity ML-Agents\nCleanRL",
    freeResources:
      "Spinning Up in Deep RL (OpenAI): https://spinningup.openai.com\nGymnasium docs: https://gymnasium.farama.org\nStable-Baselines3 docs: https://stable-baselines3.readthedocs.io\nDavid Silver’s RL course: https://www.davidsilver.uk/teaching/",
    icon: "zap",
    order: 7,
    featured: false,
  },
  {
    name: "Expert Systems",
    slug: "expert-systems",
    shortDefinition:
      "Classic AI programs that encode human expertise as rules to give advice in a narrow domain.",
    longDescription:
      "Expert systems were the dominant form of applied AI in the 1970s and 1980s. They consist of a knowledge base — hundreds or thousands of if-then rules supplied by human experts — and an inference engine that applies those rules to a given situation.\n\nA medical expert system like MYCIN could diagnose bacterial infections and recommend antibiotics by walking through a decision tree of symptoms and test results. Industrial systems like XCON configured mainframe computers from customer orders, saving companies millions of dollars.\n\nExpert systems are transparent and easy to audit: every conclusion can be traced back to the rules that produced it. Their weakness is brittleness — they know nothing outside their rules, cannot learn from new cases, and require experts to manually encode knowledge. Modern AI has largely moved to learning-based approaches, but rule-based logic still lives on in chatbots’ decision trees, business-process automation, and regulatory “if this, then that” compliance systems.",
    examples:
      "MYCIN (medical diagnosis)\nXCON (computer configuration)\nTax preparation advisors\nLoan application decisioning\nAutomated help-desk triage",
    tools:
      "Drools (business rules)\nCLIPS (rule engine)\nProlog\nRule-based logic in Python\nDecision-tree toolkits",
    freeResources:
      "CLIPS documentation: https://www.clipsrules.net\nProlog tutorials: https://www.learnprolognow.org\n“Expert Systems: Principles and Programming” open materials\nWikipedia: Expert system: https://en.wikipedia.org/wiki/Expert_system",
    icon: "git-branch",
    order: 8,
    featured: false,
  },
  {
    name: "Speech Recognition",
    slug: "speech-recognition",
    shortDefinition:
      "The technology that converts spoken audio into text, enabling voice interfaces and accessibility tools.",
    longDescription:
      "Speech recognition (automatic speech recognition, or ASR) turns an audio waveform into a sequence of words. It involves an acoustic model that maps sounds to phonetic units, a language model that ranks likely word sequences, and increasingly end-to-end neural networks that do both at once.\n\nModern systems like Whisper, DeepSpeech, and commercial assistants transcribe with near-human accuracy in many languages, even in noisy environments. Beyond simple transcription, speech AI includes speaker diarization (who spoke when), keyword spotting, emotion recognition, and speech synthesis (text-to-speech).\n\nSpeech technology has been transformative for accessibility: dictation for people with mobility impairments, real-time captions for the deaf and hard of hearing, and voice control for hands-busy situations. Challenges include handling accents, background noise, domain vocabulary like medical terms, and protecting privacy in always-listening devices.",
    examples:
      "Virtual assistants (voice commands)\nReal-time closed captions\nVoice dictation in documents\nCall-center transcription and analysis\nLanguage learning pronunciation feedback",
    tools:
      "OpenAI Whisper (open weights)\nMozilla DeepSpeech\nVosk (offline ASR)\nKaldi\nCMU Sphinx",
    freeResources:
      "Whisper GitHub: https://github.com/openai/whisper\nVosk documentation: https://alphacephei.com/vosk/\nMozilla DeepSpeech repo: https://github.com/mozilla/DeepSpeech\nSpeech and Language Processing (Jurafsky): https://web.stanford.edu/~jurafsky/slp3/",
    icon: "audio-lines",
    order: 9,
    featured: false,
  },
  {
    name: "Recommendation Systems",
    slug: "recommendation-systems",
    shortDefinition:
      "AI systems that predict what a user will like and rank items — from movies and music to products and news.",
    longDescription:
      "Recommendation systems decide what to show you: the next video, the song for your commute, the product you didn’t know you wanted. They learn preferences from your behavior — what you watched, clicked, purchased, or skipped — and from the behavior of similar users.\n\nTwo classic families exist. Collaborative filtering finds patterns across users: people who liked what you liked probably share other tastes. Content-based filtering recommends items similar to ones you already enjoyed, based on item features like genre, actors, or keywords. Modern systems are hybrids that combine both, often with deep learning and large-scale ranking models.\n\nRecommendations shape much of the modern internet, but they also raise concerns: filter bubbles that narrow exposure to diverse ideas, feedback loops that reinforce extremes, and the opaque way engagement metrics are optimized. Good recommender design balances relevance with diversity, transparency, and user control.",
    examples:
      "Movie and series suggestions (Netflix-style)\nMusic discovery (Spotify-style)\nE-commerce product recommendations\nNews feed ranking\nCourse and job recommendations",
    tools:
      "Surprise (scikit-learn ecosystem)\nImplicit (collaborative filtering)\nLightFM\nTensorFlow Recommenders\nAmazon Personalize (managed, free tier only)",
    freeResources:
      "TensorFlow Recommenders docs: https://www.tensorflow.org/recommenders\nSurprise documentation: https://surpriselib.com\n“Recommender Systems Handbook” open chapters\nGoogle Developers recommendation course: https://developers.google.com/machine-learning/recommendation",
    icon: "thumbs-up",
    order: 10,
    featured: false,
  },
];

// ---------------------------------------------------------------------------
// Workflow steps (10)
// ---------------------------------------------------------------------------

export const workflowSteps: Omit<WorkflowStep, "id" | "createdAt" | "updatedAt">[] = [
  {
    title: "Problem Definition",
    subtitle: "Start with the question, not the technology",
    description:
      "Every AI project begins with a clearly defined real-world problem, measurable success criteria, and an honest look at constraints.",
    details:
      "The most common reason AI projects fail is that the problem was never precisely defined. Start by writing the problem in plain language: who is affected, what pain exists today, and what would improve. Then translate that into a machine learning framing — is this a classification task, a regression task, a ranking problem, or something else?\n\nNext, define success metrics before building anything. For a spam filter, is success measured by precision (few false alarms) or recall (catching every spam message)? The metric should match the business or personal goal, not just “accuracy.”\n\nFinally, inventory your constraints: how much data do you have or can you collect, what is the quality of that data, what compute is available, what privacy regulations apply, and what is the acceptable cost of a mistake? A wrong prediction in a movie recommender is annoying; a wrong prediction in medical triage is dangerous. These constraints determine every later decision.",
    inputs: "Stakeholder interviews\nExisting process documentation\nBusiness or personal goals",
    outputs: "Problem statement (one page or less)\nSuccess metrics\nFeasibility assessment",
    tools: "Pen and paper / whiteboard\nNotion or any notes app\nSimple spreadsheets for metric planning",
    bestPractices:
      "Write the problem statement in language a non-technical person can understand.\nDefine both the target metric and the cost of failure.\nDecide early: does this really need AI, or would a simple rule suffice?",
    order: 1,
    icon: "target",
    animationType: "pulse",
  },
  {
    title: "Data Collection",
    subtitle: "AI is only as good as its data",
    description:
      "Gather the raw material: datasets, sources, labels, and an understanding of data quality.",
    details:
      "Models learn from data, so data quality is the single biggest lever on model quality. Start by mapping what data already exists — logs, databases, public datasets, surveys — and what must be collected fresh.\n\nData comes in two broad shapes. Structured data lives in tables with rows and columns, like customer records or sensor readings. Unstructured data has no fixed schema: text documents, images, audio, and video. Most of the world’s data is unstructured, which is why preprocessing it well matters so much.\n\nIf your task is supervised learning, you also need labels — the correct answers the model will learn from. Labeling can be done by humans (expensive but high quality), derived from existing signals (like a purchase indicating preference), or generated by heuristics. Plan for label quality checks: a model trained on noisy labels quietly inherits that noise.",
    inputs: "Internal databases and logs\nPublic datasets\nWeb scraping (respecting terms of service)\nHuman-created content",
    outputs: "A dataset inventory\nSource list and licenses\nInitial label plan",
    tools: "Kaggle Datasets / Hugging Face Datasets\nPandas and Polars\nSQL queries against existing data\nWeb scraping with BeautifulSoup / Playwright",
    bestPractices:
      "Document the origin and license of every dataset — public ones are not always free to use.\nPlan for label quality: sample and double-check labels early.\nCollect more data than you think you need; you will lose some in cleaning.",
    order: 2,
    icon: "database",
    animationType: "pulse",
  },
  {
    title: "Data Cleaning and Preprocessing",
    subtitle: "Turn raw data into a trustworthy foundation",
    description:
      "Handle missing values, remove duplicates, normalize, and transform data into a form models can learn from.",
    details:
      "Real-world data is messy: missing cells, duplicate rows, inconsistent formats, outliers, and typos. Cleaning is unglamorous and essential. A common rule of thumb is that data preparation takes 60–80% of a project’s time.\n\nMissing values can be dropped, filled with a sensible default (mean, median, or a category for “unknown”), or predicted from other columns — each choice carries assumptions you should record. Duplicates can silently inflate the importance of repeated examples. Outliers may be measurement errors or genuine rare events; context decides whether to trim, cap, or keep them.\n\nPreprocessing then transforms data into model-ready form: normalizing numeric features to comparable scales, encoding categorical values, tokenizing text, resizing and normalizing images, and splitting the data into train, validation, and test sets. Critically, any statistics computed during preprocessing (like the mean for normalization) must be computed on the training split only, to avoid leaking information from the test set.",
    inputs: "Raw collected data\nDataset inventory from step 2",
    outputs: "Cleaned, consistent dataset\nDocumented transformation pipeline\nTrain / validation / test splits",
    tools: "Pandas, Polars, NumPy\nscikit-learn pipelines\nGreat Expectations (data validation)\nSQL for deduplication",
    bestPractices:
      "Version your data and document every cleaning decision.\nSplit data before preprocessing, not after — prevent data leakage.\nWrite cleaning steps as reusable pipeline code, not one-off scripts.",
    order: 3,
    icon: "sparkles",
    animationType: "pulse",
  },
  {
    title: "Feature Engineering",
    subtitle: "Choose what the model gets to see",
    description:
      "Features are the variables a model learns from. Good features make learning easy; bad features make it impossible.",
    details:
      "A feature is a measurable property of an example — the number of bedrooms in a house listing, the average word length in a review, the color histogram of an image. Feature engineering is the craft of constructing and selecting features that expose the signal in your data.\n\nFeature selection removes irrelevant or redundant features, which speeds up training and reduces overfitting. Feature extraction creates new, more informative features from raw ones: aggregating a time series into daily averages, combining a date into “day of week,” or using domain knowledge to define a ratio.\n\nModern deep learning has shifted the balance: networks learn their own internal features from raw input, which is why deep models need less manual feature engineering. But for tabular data and classical models, thoughtful features still win. The guiding principle is representation: the model can only be as good as what it is shown, so aim for features that are relevant, non-redundant, and correctly scaled.",
    inputs: "Cleaned dataset\nDomain knowledge about the problem",
    outputs: "Feature matrix ready for modeling\nFeature list with rationale",
    tools: "Pandas and NumPy\nFeature-engine library\nDomain-specific libraries (e.g., text features with TF-IDF)",
    bestPractices:
      "Start simple: a few strong features beat fifty weak ones.\nVerify features have no missing or nonsensical values.\nRecord why each feature exists — future you will ask.",
    order: 4,
    icon: "wand",
    animationType: "pulse",
  },
  {
    title: "Model Selection",
    subtitle: "Pick the right tool for the job",
    description:
      "Choose a suitable AI method — regression, classification, neural networks, transformers, or clustering — based on your data and goal.",
    details:
      "Model selection is about matching the method to the problem. For predicting a continuous number, use regression (linear, tree-based, or neural). For assigning categories, use classifiers — logistic regression, support vector machines, gradient-boosted trees, or neural networks. For finding structure without labels, use clustering (k-means, DBSCAN) or dimensionality reduction.\n\nFor text and language, transformer-based models dominate. For images, convolutional networks and vision transformers are standard. For sequential decisions, reinforcement learning applies.\n\nPractical guidance: start with the simplest model that could plausibly work — a linear model or a small tree ensemble. It gives you a baseline and a sanity check on your data pipeline. Only escalate to larger models when the baseline has exhausted simple improvements. Also consider interpretability: in regulated domains a transparent model you can explain may be worth a small accuracy loss versus a black box.",
    inputs: "Feature matrix\nSuccess metrics from step 1\nData sizes and constraints",
    outputs: "Shortlist of candidate models\nBaseline model\nRationale document",
    tools: "scikit-learn (classical methods)\nXGBoost / LightGBM (gradient boosting)\nPyTorch / TensorFlow (neural networks)\nHugging Face (pretrained transformers)",
    bestPractices:
      "Always build a trivial baseline first (predict the most common class or the mean).\nPrefer simple models when performance is comparable.\nWrite down why each candidate was chosen or rejected.",
    order: 5,
    icon: "sliders",
    animationType: "pulse",
  },
  {
    title: "Model Training",
    subtitle: "The learning loop",
    description:
      "Run the training loop: feed data, compute loss, update weights — over many epochs — while validating along the way.",
    details:
      "Training is the process of adjusting a model’s parameters to reduce error. In the typical loop, the model makes predictions on a batch of training examples, a loss function measures how wrong those predictions are, and an optimizer (such as SGD or Adam) updates the parameters to nudge the loss down. This repeats for many batches.\n\nAn epoch is one full pass over the training data. Models are usually trained for multiple epochs, and the right number is found by watching validation performance — not by minimizing training loss, which just leads to memorization.\n\nThe loss function encodes what “wrong” means: mean squared error for regression, cross-entropy for classification, specialized losses for ranking or generation. Hyperparameters like learning rate, batch size, and model size shape how training behaves; a learning rate that is too high diverges, one that is too low crawls.\n\nValidation is the guardrail: after each epoch (or more often), evaluate on data the model has never seen. When validation performance stops improving, stop — that is the moment the model is about to start memorizing training noise.",
    inputs: "Training and validation splits\nCandidate models and hyperparameters\nCompute budget",
    outputs: "Trained model checkpoint\nTraining curves (loss over time)\nHyperparameter notes",
    tools: "PyTorch / TensorFlow\nHugging Face Trainer\nOptuna (hyperparameter search)\nWeights & Biases (free tier) or simple logging",
    bestPractices:
      "Monitor training and validation loss on the same chart — divergence signals overfitting.\nSave the best checkpoint, not the last one.\nFix the random seed for reproducible runs.",
    order: 6,
    icon: "activity",
    animationType: "pulse",
  },
  {
    title: "Evaluation",
    subtitle: "Measure what matters on unseen data",
    description:
      "Assess the model with the right metrics — accuracy, precision, recall, F1 — and guard against overfitting and underfitting.",
    details:
      "Evaluation answers one question: does this model actually work? The honest answer requires testing on data the model never saw during training, the held-out test set.\n\nAccuracy (correct predictions ÷ total) is intuitive but misleading when classes are imbalanced: a model that always predicts “not spam” can be 99% accurate on a mostly-legitimate inbox while catching nothing. Precision measures how many positive predictions were correct (few false alarms); recall measures how many actual positives were found (few misses). The F1 score balances both. The confusion matrix shows exactly where errors fall — which classes get confused with which.\n\nTwo failure modes dominate. Overfitting means the model memorized training noise and performs well in training but poorly on new data — the gap between training and test performance is the tell. Underfitting means the model is too simple to capture the pattern at all; both training and test performance are poor. Evaluation is also where you check for fairness: slice your test results by demographic groups or edge cases, because average metrics hide uneven failures.",
    inputs: "Trained model\nTest set (unseen data)\nSuccess metrics from step 1",
    outputs: "Metric report (accuracy, precision, recall, F1)\nConfusion matrix\nOverfitting / underfitting diagnosis",
    tools: "scikit-learn metrics module\nPandas for slicing results\nMatplotlib / seaborn for charts\nConfusion-matrix visualizations",
    bestPractices:
      "Never tune hyperparameters against the test set — use validation for tuning.\nReport several metrics, not just accuracy.\nEvaluate on the slices that matter (rare classes, subgroups, edge cases).",
    order: 7,
    icon: "gauge",
    animationType: "pulse",
  },
  {
    title: "Deployment",
    subtitle: "Ship the model to the real world",
    description:
      "Serve the model through an API or app, choose the right infrastructure, and monitor it in production.",
    details:
      "A model in a notebook is a prototype; a model behind an endpoint is a product. Deployment means making predictions available where they are needed: as a REST API, embedded in a web or mobile app, or running directly on edge devices like phones and cameras.\n\nModel serving translates training artifacts into a runtime service. Standard approaches include exporting to a runtime format (ONNX, TorchScript, or a TensorFlow SavedModel), wrapping it in an HTTP server, and containerizing for scaling. For low-latency or offline use, models are optimized and compressed — quantized to lower precision, pruned, or distilled — and deployed on-device.\n\nDeployment also means infrastructure: where the model runs, how it scales under load, how it is versioned, and how rollbacks work. The API surface matters too — inputs must be validated exactly as they were preprocessed in training, or predictions silently degrade. Finally, plan for monitoring from day one: latency, error rates, and the quality of the predictions themselves.",
    inputs: "Evaluated model\nAPI and product requirements\nInfrastructure budget",
    outputs: "Deployed prediction API or app\nInput validation layer\nMonitoring plan",
    tools: "FastAPI / Flask\nONNX Runtime\nDocker\nVercel / self-hosted Node servers\nCloud free tiers (e.g., Fly.io, Railway)",
    bestPractices:
      "Wrap the model with the same preprocessing code used in training.\nVersion models and support rollback.\nDefine latency and uptime expectations before launch.",
    order: 8,
    icon: "rocket",
    animationType: "pulse",
  },
  {
    title: "Monitoring and Feedback",
    subtitle: "The model is never finished",
    description:
      "Track performance over time, watch for data drift, collect user feedback, and improve continuously.",
    details:
      "Deployed models decay. The world changes: new products appear, users’ behavior shifts, seasons pass, and the data distribution the model learned from drifts away from reality. Monitoring is how you notice before users do.\n\nData drift means the incoming data no longer matches the training distribution — your housing-price model was trained on 2023 data and now it is 2026. Concept drift means the relationship itself changed, like a recommendation model trained on pre-pandemic viewing habits. Monitoring both requires tracking input distributions and, where possible, collecting ground-truth outcomes after the fact.\n\nUser feedback closes the loop: thumbs-down buttons, correction features, and support tickets are gold for improvement. Log them, review them, and feed them back into retraining. The cycle is continuous: monitor, collect, retrain, redeploy, repeat. A healthy ML system is one you are willing to watch — and one with a documented owner who will.",
    inputs: "Production logs and metrics\nUser feedback signals\nUpdated datasets over time",
    outputs: "Monitoring dashboards\nDrift alerts\nRetraining cadence plan",
    tools: "Prometheus / Grafana (self-hosted, free)\nSimple log analysis with SQL\nCustom drift checks in Python\nA/B testing tooling",
    bestPractices:
      "Define alert thresholds before something breaks, not after.\nInstrument prediction inputs and outcomes from day one.\nSchedule periodic retraining; don’t wait for failure.",
    order: 9,
    icon: "radar",
    animationType: "pulse",
  },
  {
    title: "Ethics and Safety",
    subtitle: "Responsibility is part of the pipeline",
    description:
      "Address bias, privacy, transparency, accountability, and human oversight throughout the lifecycle.",
    details:
      "Ethics is not a final step to bolt on — it is a set of practices threaded through every earlier step. Bias can enter at data collection (unrepresentative samples), at labeling (annotator assumptions), at modeling (optimizing the wrong metric), and at deployment (unequal access). Auditing for bias means testing performance across groups, documenting the data, and being honest about limitations.\n\nPrivacy demands minimal data collection, secure storage, and respect for the people behind the data — including allowing them to opt out. Transparency means being able to explain, at least at a high level, why a decision was made and flagging when a system is probabilistic. Accountability means naming who is responsible when an AI system harms someone, and building in human oversight for high-stakes decisions.\n\nPractical safety measures include guardrails on generative models, human review of consequential outputs, kill switches for autonomous systems, and impact assessments before launch. The goal is not to avoid risk entirely — no system is risk-free — but to make risk visible, measured, and governed by humans.",
    inputs: "Bias and fairness audit results\nPrivacy and compliance requirements\nStakeholder input",
    outputs: "Ethics review sign-off\nMitigation plan\nHuman oversight design",
    tools: "Fairlearn (fairness metrics)\nAI Fairness 360\nDatasheets for datasets templates\nModel cards documentation",
    bestPractices:
      "Document data provenance and limitations in a model card.\nTest outcomes across demographic groups, not just overall.\nKeep a human in the loop for consequential decisions.",
    order: 10,
    icon: "shield-check",
    animationType: "pulse",
  },
];

// ---------------------------------------------------------------------------
// Timeline (10 events)
// ---------------------------------------------------------------------------

export const timelineEvents: Omit<TimelineEvent, "id" | "createdAt" | "updatedAt">[] = [
  {
    year: "1950",
    title: "The Turing Test",
    description:
      "Alan Turing publishes “Computing Machinery and Intelligence,” asking whether machines can think and proposing the imitation game — the Turing Test — as a practical measure of machine intelligence.",
    category: "Foundations",
    sourceNote: "Public-domain paper by Alan Turing.",
    order: 1,
  },
  {
    year: "1956",
    title: "Birth of AI as a Field",
    description:
      "The Dartmouth Summer Research Project coins the term “artificial intelligence.” John McCarthy, Marvin Minsky, and others gather to explore the hypothesis that every aspect of learning can be described precisely enough to simulate on a machine.",
    category: "Foundations",
    sourceNote: "Dartmouth workshop proposal, public record.",
    order: 2,
  },
  {
    year: "1966",
    title: "ELIZA: The First Chatbot",
    description:
      "Joseph Weizenbaum builds ELIZA, a simple pattern-matching program that parodies a psychotherapist. Many users became emotionally attached, revealing early lessons about how humans project intelligence onto machines.",
    category: "NLP",
    sourceNote: "Weizenbaum, published in the Communications of the ACM.",
    order: 3,
  },
  {
    year: "1980",
    title: "The Expert Systems Era",
    description:
      "Rule-based expert systems like MYCIN (medical diagnosis) and XCON (computer configuration) prove that AI can deliver real business value, sparking the first commercial AI boom — and later the “AI winter” when expectations outran reality.",
    category: "Expert Systems",
    sourceNote: "Stanford (MYCIN); DEC (XCON) case histories.",
    order: 4,
  },
  {
    year: "1986",
    title: "Backpropagation Revives Neural Networks",
    description:
      "The backpropagation algorithm, popularized by Rumelhart, Hinton, and Williams, gives multi-layer neural networks an efficient way to learn. It lays the mathematical foundation for modern deep learning.",
    category: "Deep Learning",
    sourceNote: "“Learning representations by back-propagating errors,” Nature, 1986.",
    order: 5,
  },
  {
    year: "1997",
    title: "Deep Blue Defeats Kasparov",
    description:
      "IBM’s Deep Blue beats world chess champion Garry Kasparov in a six-game match — a milestone of search and specialized hardware that captured the public imagination.",
    category: "Games",
    sourceNote: "IBM Deep Blue project records.",
    order: 6,
  },
  {
    year: "2012",
    title: "AlexNet and the Deep Learning Breakthrough",
    description:
      "AlexNet wins the ImageNet image recognition competition by a wide margin using deep convolutional networks on GPUs, demonstrating that depth plus data plus compute could transform computer vision — and launching the modern deep learning era.",
    category: "Deep Learning",
    sourceNote: "Krizhevsky, Sutskever, Hinton, NeurIPS 2012.",
    order: 7,
  },
  {
    year: "2017",
    title: "The Transformer Architecture",
    description:
      "“Attention Is All You Need” introduces the Transformer, a neural architecture built on self-attention rather than recurrence. Transformers become the foundation of modern NLP and, later, of large language models.",
    category: "NLP",
    sourceNote: "Vaswani et al., NeurIPS 2017.",
    order: 8,
  },
  {
    year: "2022",
    title: "Generative AI Goes Mainstream",
    description:
      "Large language models and diffusion models — GPT-3.5/ChatGPT, Stable Diffusion, DALL·E — bring generative AI to hundreds of millions of people, making the technology a subject of everyday conversation, policy, and creative work.",
    category: "Generative AI",
    sourceNote: "Public model releases and usage reports.",
    order: 9,
  },
  {
    year: "2025+",
    title: "Multimodal, Agentic, and Responsible AI",
    description:
      "Current AI systems combine text, images, audio, and video in one model; agentic systems take multi-step actions; and the field wrestles with alignment, safety, regulation, and equitable access. The future is being written now.",
    category: "Future",
    sourceNote: "Ongoing public research and industry directions.",
    order: 10,
  },
];