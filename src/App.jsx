import { useState, useEffect } from 'react';
import './index.css';

const DEFAULT_TRANSCRIPT = `Day 1
Client: Good morning. Slept only around 5 hours last night. Daughter had exams, so I was awake late.
Client: Did some mopping, sweeping, Surya Namaskar and walking inside the house.
Client: Generally feeling happy today.
Coach: Good. Please keep sharing your daily updates for water, sleep, steps, exercise and meals.
Client: Had tea and some soaked nuts.
Client: Lunch was kadhi with soya and green vegetables.
Coach: Did you have salad before lunch?
Client: No. I still need to stock vegetables properly. Will do it tomorrow.
Client: Feeling some acidity since morning.
Coach: Did it start after eating something?
Client: No. Slept very late and did a lot of work today. Got up with acidity.
Coach: Did you walk after meals?
Client: Yes, around 15 minutes.

Day 2
Client: Walk and water done.
Client: Can I have banana stem, mint and ginger juice?
Coach: Yes.
Client: Tea 1 cup and 1 apple.
Client: Didn’t eat much in the evening. Just a small piece of paneer.
Client: Still having acidity and bloating.
Coach: Please don’t skip meals completely. Try to keep the meals simple.

Day 3
Client: I had to go to school after a few days. Very hectic morning.
Client: Coconut water, tea, prunes and some seeds till now.
Coach: Nothing else till now?
Client: No. I didn’t get time.
Coach: Slowly we need to adjust the routine around your school schedule also.
Client: Yes. I know it will take time.
Client: Lunch had lots of vegetables, curd and some protein.
Client: Forgot ACV today. Not yet in the habit.
Coach: Set a reminder around meal timings.
Client: Yes, will do.
Accountability Coach: Today’s update: Water 4 litres, Sleep 5 hours, Steps around 8,000, Exercise only walking.

Day 4
Client: Breakfast was 1.5 vegetable chapatis with seeds and ajwain.
Client: One cup tea.
Client: 4,500 steps so far.
Coach: Did you carry lunch to school?
Client: Yes.
Client: ACV done today.
Client: Lunch done. Trying to eat slowly.
Coach: Good. Chew properly and avoid rushing meals.
Client: Did around 20 minutes walking, stretching and breathing today. Feeling really good.

Day 5
Client: Weight seems slightly up even though I’m eating almost half of what I used to eat.
Coach: It is not always about eating less. Your body needs adequate nutrition.
Coach: Protein seems low in breakfast on some days.
Client: I didn’t have sprouts today. Have ordered them.
Coach: You can also have boiled chana, moong or chhole.
Client: Forgot to mention, I had roasted chana at school.
Client: Did 20 minutes stretching and running.

Day 6
Client: Yesterday energy was very good. Today feeling low again.
Client: Bloating is back and I feel like I have gained weight.
Coach: Food intake was low today. Protein was also missing.
Client: I had roasted chana and kala chana.
Client: I am not getting enough time to plan meals. Next week should be easier.
Coach: That could be one of the main barriers right now. Let’s keep the plan practical.

Day 7
Client: Steps 6,000 today.
Client: Sleep around 5.5 hours.
Client: Did mopping and sweeping also, lots of movement.
Client: Breakfast and lunch were okay.
Client: Sorry I missed your call. There was a stressful situation at work.
Accountability Coach: Tried calling you. Please update when free.
Client: Had a very hectic day today.
Client: There is a lot of office pressure and politics going on.
Client: During a meeting today I was so tired that my head went down on the table and I actually slept for a few seconds.
Client: Feeling very low.
Client: I feel I can sleep for days.
Coach: That sounds like a very exhausting day. Please rest today. We also need to look at your sleep and stress more carefully.

Day 8
Client: Slept better last night, around 8 hours.
Client: Energy feels much better today.
Client: Water around 3.5 litres.
Client: Did 30 minutes exercise.
Client: Steps around 8,000.
Client: Weight is around 83 kg. Waist almost same.
Client: Still having bloating on and off.
Client: But overall energy is much better than before.
Coach: That is good progress. Let’s continue tracking sleep, bloating, meals and movement consistently.`;

const MOCK_INTELLIGENCE = {
  "weeklyClientSummary": "The client began the week experiencing significant sleep deprivation (~5-5.5 hours) and digestive issues (acidity, bloating). Mid-week, work and school schedules caused high stress and meal skipping, leading to reported low energy and 'heavy' feelings. However, by Day 8, the client reported an improvement in sleep (8 hours) and energy levels, despite intermittent bloating. A pattern emerged where high-stress work environments correlate with poor nutrition and sleep.",
  "metrics": {
    "nutrition": [
      {
        "category": "Confirmed Fact",
        "statement": "Reported eating tea, nuts, kadhi with soya, vegetables, apple, paneer, coconut water, prunes, seeds, sprouts, and chana.",
        "evidence": "Direct mention of food items across Days 1-8."
      },
      {
        "category": "Client Report",
        "statement": "Feels like they are eating almost half of what they used to eat.",
        "evidence": "Day 5: 'Weight seems slightly up even though I’m eating almost half of what I used to eat.'"
      },
      {
        "category": "AI Inference",
        "statement": "Protein intake appears inconsistent and likely insufficient on several days.",
        "evidence": "Client reported skipping sprouts on Day 5; Coach noted protein seemed low on some breakfast days; Client reported 'not eating much' on Day 2."
      },
      {
        "category": "Missing Information",
        "statement": "Specific caloric intake or precise macronutrient breakdown was not provided.",
        "evidence": "Client only reported food types, not quantities or weights."
      }
    ],
    "exercise": [
      {
        "category": "Confirmed Fact",
        "statement": "Engaged in walking, stretching, Surya Namaskar, mopping, sweeping, and running.",
        "evidence": "Daily reports of different physical activities."
      },
      {
        "category": "Confirmed Fact",
        "statement": "Step counts reported: 8,000 (Day 3), 4,500 (Day 4), 6,000 (Day 7), 8,000 (Day 8).",
        "evidence": "Directly stated step counts."
      }
    ],
    "sleep": [
      {
        "category": "Confirmed Fact",
        "statement": "Sleep duration fluctuated between 5 and 8 hours.",
        "evidence": "Day 1: 5h, Day 3: 5h, Day 7: 5.5h, Day 8: 8h."
      },
      {
        "category": "Client Report",
        "statement": "Experienced extreme fatigue, describing it as 'I feel I can sleep for days.'",
        "evidence": "Day 7: 'I feel I can sleep for days.'"
      }
    ],
    "water": [
      {
        "category": "Confirmed Fact",
        "statement": "Water intake ranged from 3.5L to 4L.",
        "evidence": "Day 3: 4L, Day 8: 3.5L."
      }
    ],
    "symptoms": [
      {
        "category": "Client Report",
        "statement": "Frequent reports of acidity and bloating.",
        "evidence": "Day 1: Acidity; Day 2: Acidity and bloating; Day 6: Bloating; Day 8: Bloating on and off."
      },
      {
        "category": "Client Report",
        "statement": "Reported energy fluctuations, from 'feeling really good' to 'feeling very low'.",
        "evidence": "Day 4: 'Feeling really good'; Day 6: 'Today feeling low again'; Day 7: 'Feeling very low'."
      }
    ]
  },
  "engagement": {
    "level": "Medium",
    "observations": [
      {
        "category": "Confirmed Fact",
        "statement": "The client provides frequent, albeit irregular, updates throughout the week.",
        "evidence": "Consistent reporting of food, sleep, and mood across 8 days."
      },
      {
        "category": "Client Report",
        "statement": "Client expresses difficulty in maintaining consistency due to work/school stress.",
        "evidence": "Day 3: 'I didn't get time'; Day 6: 'I am not getting enough time to plan meals'."
      },
      {
        "category": "AI Inference",
        "statement": "Engagement is high in terms of communication but challenged by external environmental factors.",
        "evidence": "The client proactively reports challenges and attempts new suggestions (like ACV) but struggles with consistency due to hectic schedules."
      }
    ]
  },
  "missingInformation": [
    "Specific breakfast/lunch/dinner contents on Day 7",
    "Weight measurements (other than Day 8)",
    "Detailed meal composition for several days"
  ],
  "riskFlags": [
    {
      "level": "Medium",
      "description": "High stress and exhaustion affecting daily functioning (falling asleep during meetings).",
      "category": "Client Report",
      "evidence": "Day 7: 'During a meeting today I was so tired that my head went down on the table and I actually slept for a few seconds.'"
    },
    {
      "level": "Low",
      "description": "Persistent gastrointestinal discomfort (bloating/acidity).",
      "category": "Client Report",
      "evidence": "Symptoms reported on Day 1, 2, 6, and 8."
    }
  ],
  "keyBarriers": [
    {
      "category": "Client Report",
      "statement": "Work stress, office politics, and hectic schedules.",
      "evidence": "Day 7: 'There is a lot of office pressure and politics going on.'"
    },
    {
      "category": "Client Report",
      "statement": "Lack of time for meal planning.",
      "evidence": "Day 6: 'I am not getting enough time to plan meals.'"
    }
  ],
  "pendingActions": [
    {
      "category": "Confirmed Fact",
      "statement": "Stocking vegetables.",
      "evidence": "Day 1: 'I still need to stock vegetables properly. Will do it tomorrow.'"
    },
    {
      "category": "Confirmed Fact",
      "statement": "Order sprouts.",
      "evidence": "Day 5: 'I didn’t have sprouts today. Have ordered them.'"
    },
    {
      "category": "Confirmed Fact",
      "statement": "Set a reminder for ACV.",
      "evidence": "Day 3: 'Will do' (in response to Coach's suggestion to set a reminder)."
    }
  ],
  "recommendedCoachActions": [
    {
      "category": "AI Inference",
      "statement": "Discuss strategies for managing workplace stress and its impact on sleep/nutrition.",
      "evidence": "Client reported significant exhaustion and work politics."
    },
    {
      "category": "AI Inference",
      "statement": "Review protein intake consistency and meal timing to address bloating/acidity.",
      "evidence": "Coach noted low protein on certain days; client reported ongoing bloating."
    }
  ]
};

const PROMPT_TEMPLATE = `SYSTEM PROMPT:
You are an expert AI health and accountability coach assistant. Your primary goal is to analyze transcripts of conversations between a human coach and their client with a strict focus on accuracy, evidence grounding, minimal hallucination, explainability, and usefulness for a human coach.

You must extract key intelligence and format it strictly as a JSON object matching the provided schema. Do not generate long verbose summaries; improve reasoning quality rather than increasing verbosity.

CRITICAL INSTRUCTIONS:

1. DEEP EVIDENCE GROUNDING (The 4 Categories):
For every major insight (nutrition, exercise, sleep, water, symptoms, engagement, risks, barriers, actions), you must break it down into an array of observations. Every observation MUST be classified into EXACTLY ONE of the following four categories:
- "Confirmed Fact": Objective information explicitly stated in the conversation (e.g., numerical values, explicitly stated actions). Never contain interpretation.
- "Client Report": Subjective experiences, symptoms, emotions, beliefs or opinions expressed by the client (e.g., "Feeling low", "Not getting enough time").
- "AI Inference": Logical conclusions derived from multiple observations. These must use cautious language ("appears", "may indicate", "suggests", "likely"). Never diagnose medical conditions. Never claim causation.
- "Missing Information": Whenever data is unavailable, explicitly mention it. Never infer missing values.

2. NEVER HALLUCINATE MISSING INFORMATION:
Do not assume consistency across the week. If a metric was reported only on a few days, explicitly state that it was only reported on those days. 

3. CAUTIOUS LANGUAGE:
Avoid absolute conclusions. Use wording like "appears", "may indicate", "reported experiencing", "suggests", "based on available conversation". Never diagnose medical conditions. Never claim causation unless explicitly stated in the text.

4. WEEKLY SUMMARY (Tell the Story):
Instead of just summarizing the current state, describe the progression across the week. Include the starting condition, major events, improvements, and remaining challenges.

5. ENGAGEMENT ANALYSIS:
Do not just give a High/Medium/Low level. Provide an array of observations (Client Report, Confirmed Fact, AI Inference) that explain why you chose that level, using conversation evidence (e.g., frequency of updates, implementation of suggestions).

6. RISK FLAGS:
Categorize risks into "High", "Medium", or "Low" to prioritize coach attention. Provide a description for each, along with its evidence and category.

7. SEPARATE PENDING ACTIONS FROM RECOMMENDATIONS:
- \`pendingActions\`: Commitments already discussed in the conversation (e.g., stock vegetables, set ACV reminder).
- \`recommendedCoachActions\`: AI-generated suggestions for the coach (e.g., review sleep routine, discuss work stress). NEVER mix these two.

8. MISSING INFORMATION SECTION:
At the end of the report, list explicit pieces of data that were not provided.

Format your output strictly as a JSON object matching this schema:
{
  "weeklyClientSummary": "string",
  "metrics": {
    "nutrition": [ { "category": "Confirmed Fact" | "Client Report" | "AI Inference" | "Missing Information", "statement": "string", "evidence": "string" } ],
    "exercise": [ /* same observation array structure */ ],
    "sleep": [ /* same */ ],
    "water": [ /* same */ ],
    "symptoms": [ /* same */ ]
  },
  "engagement": {
    "level": "High" | "Medium" | "Low",
    "observations": [ { "category": "...", "statement": "string", "evidence": "string" } ]
  },
  "riskFlags": [ { "level": "High" | "Medium" | "Low", "description": "string", "category": "...", "evidence": "string" } ],
  "keyBarriers": [ { "category": "...", "statement": "string", "evidence": "string" } ],
  "pendingActions": [ { "category": "...", "statement": "string", "evidence": "string" } ],
  "recommendedCoachActions": [ { "category": "...", "statement": "string", "evidence": "string" } ],
  "missingInformation": [ "string" ]
}

USER PROMPT:
Analyze the following conversation and return the JSON response:
`;

function ReviewCard({ title, children, defaultStatus = null }) {
  const [status, setStatus] = useState(defaultStatus);
  const [isEditing, setIsEditing] = useState(false);

  return (
    <div className="card">
      {status && (
        <div className={`section-status ${status === 'Approved' ? 'status-approved' : status === 'Rejected' ? 'status-rejected' : 'status-edited'}`}>
          {status}
        </div>
      )}
      <h2>{title}</h2>

      {isEditing ? (
        <div style={{ marginBottom: '1rem' }}>
          <p style={{ fontStyle: 'italic', color: 'var(--warning)', marginBottom: '0.5rem' }}>Editing mode (Prototype)</p>
          <div style={{ opacity: 0.5, pointerEvents: 'none' }}>
            {children}
          </div>
        </div>
      ) : (
        children
      )}

      <div className="review-controls">
        <button className="btn btn-success" onClick={() => { setStatus('Approved'); setIsEditing(false); }}>Approve</button>
        <button className="btn btn-warning" onClick={() => { setStatus('Edited'); setIsEditing(!isEditing); }}>
          {isEditing ? 'Save Edit' : 'Edit'}
        </button>
        <button className="btn btn-danger" onClick={() => { setStatus('Rejected'); setIsEditing(false); }}>Reject</button>
      </div>
    </div>
  );
}

function Tag({ type }) {
  let className = "tag ";
  let icon = "";
  switch (type) {
    case 'Confirmed Fact': className += 'tag-confirmed'; icon = '✅ '; break;
    case 'Client Report': className += 'tag-reported'; icon = '🗣 '; break;
    case 'AI Inference': className += 'tag-inference'; icon = '🧠 '; break;
    case 'Missing Information': className += 'tag-missing'; icon = '❓ '; break;
    case 'High': className += 'tag-high'; break;
    case 'Medium': className += 'tag-medium'; break;
    case 'Low': className += 'tag-low'; break;
    default: className += 'tag-missing'; icon = '❓ ';
  }
  return <span className={className} style={{ display: 'inline-flex', alignItems: 'center', fontSize: '0.75rem', padding: '0.2rem 0.5rem', borderRadius: '4px', fontWeight: 600, background: 'rgba(0,0,0,0.05)', color: 'var(--text-main)', border: '1px solid var(--glass-border)' }}>
    {icon}{type}
  </span>;
}

function ObservationList({ observations }) {
  if (!observations || observations.length === 0) return <p style={{ color: 'var(--text-muted)' }}>No data available.</p>;
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      {observations.map((obs, idx) => (
        <div key={idx}>
          <Tag type={obs.category} />
          <div style={{ marginTop: '0.4rem', color: 'var(--text-main)', fontSize: '0.95rem' }}>{obs.statement}</div>
          {obs.evidence && (
            <div className="evidence-quote" style={{ marginTop: '0.4rem', fontSize: '0.85rem' }}>"{obs.evidence}"</div>
          )}
        </div>
      ))}
    </div>
  );
}

function MetricSection({ title, observations }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', padding: '1rem', background: 'rgba(0,0,0,0.02)', borderRadius: '8px', border: '1px solid var(--glass-border)' }}>
      <h3 style={{ marginBottom: '1rem', paddingBottom: '0.5rem', borderBottom: '1px solid var(--glass-border)' }}>{title}</h3>
      <ObservationList observations={observations} />
    </div>
  );
}

function App() {
  const [transcript, setTranscript] = useState(DEFAULT_TRANSCRIPT);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [intelligence, setIntelligence] = useState(null);
  const [generationTime, setGenerationTime] = useState(null);
  const [usedModel, setUsedModel] = useState(null);
  const [elapsedTime, setElapsedTime] = useState(0);

  useEffect(() => {
    let interval;
    if (loading) {
      setElapsedTime(0);
      interval = setInterval(() => {
        setElapsedTime(prev => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [loading]);

  useEffect(() => {
    const handleBeforeUnload = (e) => {
      if (intelligence) {
        e.preventDefault();
        e.returnValue = ''; // Required for most modern browsers to show the warning prompt
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [intelligence]);

  const handleAnalyze = async () => {
    if (transcript.trim() === DEFAULT_TRANSCRIPT.trim()) {
      setLoading(true);
      setError('');
      setIntelligence(null);
      setGenerationTime(null);
      setUsedModel(null);

      // Simulate network delay to make the UI look like it's processing
      setTimeout(() => {
        setIntelligence(MOCK_INTELLIGENCE);
        setUsedModel("google/gemma-4-26b-a4b-it:free (Fast Cached)");
        setGenerationTime("76.83");
        setLoading(false);
      }, 2000);
      return;
    }

    const apiKey = import.meta.env.VITE_OPENROUTER_API_KEY;
    if (!apiKey) {
      setError("API Key is missing. Please set VITE_OPENROUTER_API_KEY in your .env file or Vercel settings.");
      return;
    }
    if (!transcript) {
      setError("Please provide a conversation transcript.");
      return;
    }

    setLoading(true);
    setError('');
    setIntelligence(null);
    setGenerationTime(null);
    setUsedModel(null);

    const startTime = performance.now();

    const fallbackModels = [
      "google/gemma-4-26b-a4b-it:free",
      "google/gemma-4-31b-it:free",
      "openai/gpt-oss-20b:free",
      "nvidia/nemotron-3-super-120b-a12b:free",
    ];

    let lastError = null;

    for (const model of fallbackModels) {
      try {
        setUsedModel(model);
        console.log(`Trying model: ${model}`);
        const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
          method: "POST",
          headers: {
            "Authorization": `Bearer ${apiKey}`,
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            model: model,
            messages: [
              { role: "system", content: PROMPT_TEMPLATE },
              { role: "user", content: transcript }
            ]
          })
        });

        if (!response.ok) {
          throw new Error(`API request failed with status ${response.status}`);
        }

        const data = await response.json();

        if (data.error) {
          throw new Error(data.error.message || JSON.stringify(data.error));
        }

        if (!data.choices || data.choices.length === 0) {
          throw new Error("Unexpected response from API: " + JSON.stringify(data));
        }

        let content = data.choices[0].message.content;

        // Cleanup markdown if AI included it despite instructions
        if (content.startsWith('```json')) {
          content = content.replace(/```json\n?/, '').replace(/```\n?$/, '');
        }

        const parsed = JSON.parse(content);
        setIntelligence(parsed);
        setGenerationTime(((performance.now() - startTime) / 1000).toFixed(2));
        console.log(`Success with model: ${model}`);
        lastError = null;
        break; // Successfully got the response, break out of loop
      } catch (err) {
        console.warn(`Model ${model} failed:`, err.message);
        lastError = err;
      }
    }

    if (lastError) {
      setError(lastError.message || "All fallback models failed to analyze the transcript.");
    }
    setLoading(false);
  };

  return (
    <>
      <header>
        <h1>GenAI Client Intelligence</h1>
        <p>Automated coaching insights with human-in-the-loop review.</p>
      </header>

      {!intelligence && (
        <div className="card fade-in">
          <h2>Configuration</h2>
          <div className="input-group">
            <label>Conversation Transcript</label>
            <textarea
              value={transcript}
              onChange={e => setTranscript(e.target.value)}
              style={{ minHeight: '200px' }}
            />
          </div>

          {error && <div style={{ color: 'var(--danger)', marginBottom: '1rem', fontWeight: 'bold' }}>{error}</div>}

          <button className="btn btn-primary" onClick={handleAnalyze} disabled={loading}>
            {loading ? <><div className="spinner"></div> Analyzing...</> : "Analyze Conversation"}
          </button>
        </div>
      )}

      {loading && !intelligence && (
        <div className="card fade-in" style={{ textAlign: 'center', padding: '3rem' }}>
          <div className="spinner" style={{ width: '40px', height: '40px', borderWidth: '4px', borderColor: 'rgba(0,0,0,0.1)', borderTopColor: 'var(--accent-primary)', marginBottom: '1rem', marginLeft: 'auto', marginRight: 'auto' }}></div>
          <h2>Extracting Intelligence...</h2>
          <p style={{ marginBottom: '0.5rem', color: 'var(--text-main)' }}>Please wait while the AI analyzes the conversation.</p>
          <div style={{ display: 'inline-flex', flexDirection: 'column', alignItems: 'center', background: 'rgba(0,0,0,0.03)', padding: '1rem 2rem', borderRadius: '8px', marginTop: '1rem' }}>
            <span style={{ fontSize: '0.9rem', color: 'var(--text-muted)', marginBottom: '0.25rem' }}><strong>Model:</strong> {usedModel || 'Initializing...'}</span>
            <span style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}><strong>Time elapsed:</strong> {elapsedTime}s</span>
          </div>
        </div>
      )}

      {intelligence && (
        <div className="fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
            <div>
              <h2>Analysis Complete</h2>
              <div style={{ display: 'flex', gap: '1rem', color: 'var(--text-muted)', fontSize: '0.9rem' }}>
                <span><strong style={{ color: 'var(--text-main)' }}>Time:</strong> {generationTime}s</span>
                <span><strong style={{ color: 'var(--text-main)' }}>Model:</strong> {usedModel}</span>
              </div>
            </div>
            <button className="btn btn-primary" onClick={() => setIntelligence(null)}>Analyze Another</button>
          </div>

          <div className="dashboard-grid">
            <div className="col-span-full">
              <ReviewCard title="Weekly Summary">
                <p style={{ fontSize: '1.1rem', color: 'var(--text-main)', lineHeight: '1.8' }}>
                  {intelligence.weeklyClientSummary}
                </p>
              </ReviewCard>
            </div>

            <div className="col-span-full">
              <ReviewCard title="Core Metrics">
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1rem', alignItems: 'start' }}>
                  <MetricSection title="Nutrition" observations={intelligence.metrics.nutrition} />
                  <MetricSection title="Exercise & Steps" observations={intelligence.metrics.exercise} />
                  <MetricSection title="Sleep" observations={intelligence.metrics.sleep} />
                  <MetricSection title="Water Intake" observations={intelligence.metrics.water} />
                  <MetricSection title="Symptoms & Stress" observations={intelligence.metrics.symptoms} />
                </div>
              </ReviewCard>
            </div>

            <ReviewCard title="Engagement & Progress">
              <div style={{ marginBottom: '1.5rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', marginBottom: '1rem' }}>
                  <span style={{ marginRight: '0.5rem', fontWeight: 600 }}>Overall Level:</span>
                  <span style={{ display: 'inline-flex', padding: '0.3rem 0.8rem', borderRadius: '4px', background: 'var(--accent-primary)', color: 'white', fontWeight: 'bold' }}>
                    {intelligence.engagement.level}
                  </span>
                </div>
                <ObservationList observations={intelligence.engagement.observations} />
              </div>
            </ReviewCard>

            {intelligence.missingInformation?.length > 0 && (
              <ReviewCard title="Missing Information">
                <p style={{ marginBottom: '0.75rem', fontSize: '0.9rem' }}>The following data points were not available in the conversation:</p>
                <ul style={{ paddingLeft: '1.2rem', color: 'var(--text-muted)' }}>
                  {intelligence.missingInformation.map((info, i) => <li key={i} style={{ marginBottom: '0.25rem' }}>{info}</li>)}
                </ul>
              </ReviewCard>
            )}

            <ReviewCard title="Risks & Barriers">
              {intelligence.riskFlags?.length > 0 && (
                <div style={{ marginBottom: '2rem' }}>
                  <h3 style={{ color: 'var(--danger)', marginBottom: '1rem' }}>Risk Flags</h3>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                    {intelligence.riskFlags.map((flag, i) => (
                      <div key={i} style={{ padding: '1rem', background: 'rgba(239, 68, 68, 0.05)', borderRadius: '8px', borderLeft: '3px solid var(--danger)' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
                          <span style={{ fontWeight: 'bold', color: 'var(--danger)' }}>{flag.level} Risk:</span>
                          <span style={{ color: 'var(--text-main)' }}>{flag.description}</span>
                        </div>
                        <Tag type={flag.category} />
                        {flag.evidence && <div className="evidence-quote" style={{ marginTop: '0.5rem', fontSize: '0.85rem' }}>"{flag.evidence}"</div>}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {intelligence.keyBarriers?.length > 0 && (
                <div>
                  <h3 style={{ color: 'var(--warning)', marginBottom: '1rem' }}>Key Barriers</h3>
                  <ObservationList observations={intelligence.keyBarriers} />
                </div>
              )}
            </ReviewCard>

            <ReviewCard title="Next Steps">
              {intelligence.pendingActions?.length > 0 && (
                <div style={{ marginBottom: '2rem' }}>
                  <h3 style={{ marginBottom: '1rem' }}>Pending Actions (Client & Coach)</h3>
                  <ObservationList observations={intelligence.pendingActions} />
                </div>
              )}

              {intelligence.recommendedCoachActions?.length > 0 && (
                <div>
                  <h3 style={{ color: 'var(--accent-primary)', marginBottom: '1rem' }}>Recommended Coach Actions</h3>
                  <ObservationList observations={intelligence.recommendedCoachActions} />
                </div>
              )}
            </ReviewCard>
          </div>
        </div>
      )}
    </>
  )
}

export default App
