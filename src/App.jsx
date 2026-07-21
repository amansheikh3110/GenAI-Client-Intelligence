import { useState } from 'react';
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

const PROMPT_TEMPLATE = `SYSTEM PROMPT:
You are an expert AI health and accountability coach assistant. Your task is to analyze transcripts of conversations between a human coach and their client. 
Extract key intelligence from the conversation and format it strictly as a JSON object matching this exact schema:
{
  "weeklyClientSummary": "string",
  "metrics": {
    "nutritionAdherence": "string",
    "exerciseAndSteps": "string",
    "sleep": "string",
    "waterIntake": "string",
    "symptomsAndStress": "string"
  },
  "engagementLevel": "High" | "Medium" | "Low",
  "keyBarriers": ["string"],
  "pendingActions": ["string"],
  "riskOrAttentionFlags": ["string"],
  "recommendedNextAction": "string",
  "supportingEvidence": [
    {
      "claim": "string",
      "quote": "string",
      "sourceType": "Confirmed Fact" | "Client-Reported" | "AI-Inference" | "Missing/Unavailable"
    }
  ]
}

Ensure your output is purely the JSON object, without any markdown formatting or introductory text.

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
  switch(type) {
    case 'Confirmed Fact': className += 'tag-confirmed'; break;
    case 'Client-Reported': className += 'tag-reported'; break;
    case 'AI-Inference': className += 'tag-inference'; break;
    case 'High': className += 'tag-high'; break;
    case 'Medium': className += 'tag-medium'; break;
    case 'Low': className += 'tag-low'; break;
    default: className += 'tag-missing';
  }
  return <span className={className}>{type}</span>;
}

function App() {
  const [transcript, setTranscript] = useState(DEFAULT_TRANSCRIPT);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [intelligence, setIntelligence] = useState(null);

  const handleAnalyze = async () => {
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

    try {
      const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${apiKey}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          model: "google/gemini-2.5-flash", // Fast and cheap model for openrouter
          messages: [
            { role: "system", content: PROMPT_TEMPLATE },
            { role: "user", content: transcript }
          ],
          response_format: { type: "json_object" }
        })
      });

      if (!response.ok) {
         throw new Error(`API request failed with status ${response.status}`);
      }

      const data = await response.json();
      let content = data.choices[0].message.content;
      
      // Cleanup markdown if AI included it despite instructions
      if (content.startsWith('\`\`\`json')) {
        content = content.replace(/\`\`\`json\\n?/, '').replace(/\`\`\`\\n?$/, '');
      }

      const parsed = JSON.parse(content);
      setIntelligence(parsed);
    } catch (err) {
      setError(err.message || "An error occurred while analyzing the transcript.");
    } finally {
      setLoading(false);
    }
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
          <div className="spinner" style={{ width: '40px', height: '40px', borderWidth: '4px', borderColor: 'rgba(255,255,255,0.1)', borderTopColor: 'var(--accent-primary)', marginBottom: '1rem' }}></div>
          <h2>Extracting Intelligence...</h2>
          <p>Please wait while the AI analyzes the conversation.</p>
        </div>
      )}

      {intelligence && (
        <div className="fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h2>Analysis Complete</h2>
            <button className="btn btn-primary" onClick={() => setIntelligence(null)}>Analyze Another</button>
          </div>

          <div className="dashboard-grid">
            <div className="col-span-full">
              <ReviewCard title="Weekly Summary">
                <p style={{ fontSize: '1.1rem', color: 'var(--text-main)' }}>{intelligence.weeklyClientSummary}</p>
              </ReviewCard>
            </div>

            <ReviewCard title="Core Metrics">
              <h3>Nutrition</h3>
              <p style={{ marginBottom: '1rem' }}>{intelligence.metrics.nutritionAdherence}</p>
              
              <h3>Exercise & Steps</h3>
              <p style={{ marginBottom: '1rem' }}>{intelligence.metrics.exerciseAndSteps}</p>
              
              <h3>Sleep</h3>
              <p style={{ marginBottom: '1rem' }}>{intelligence.metrics.sleep}</p>
              
              <h3>Water Intake</h3>
              <p style={{ marginBottom: '1rem' }}>{intelligence.metrics.waterIntake}</p>
              
              <h3>Symptoms & Stress</h3>
              <p>{intelligence.metrics.symptomsAndStress}</p>
            </ReviewCard>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              <ReviewCard title="Engagement & Flags">
                <div style={{ display: 'flex', alignItems: 'center', marginBottom: '1rem' }}>
                  <span style={{ marginRight: '0.5rem', fontWeight: 600 }}>Engagement Level:</span>
                  <Tag type={intelligence.engagementLevel} />
                </div>

                {intelligence.riskOrAttentionFlags?.length > 0 && (
                  <>
                    <h3 style={{ color: 'var(--danger)' }}>Critical Risks / Flags</h3>
                    <ul style={{ paddingLeft: '1.2rem', marginBottom: '1rem', color: 'var(--danger)' }}>
                      {intelligence.riskOrAttentionFlags.map((flag, i) => <li key={i}>{flag}</li>)}
                    </ul>
                  </>
                )}

                {intelligence.keyBarriers?.length > 0 && (
                  <>
                    <h3>Key Barriers</h3>
                    <ul style={{ paddingLeft: '1.2rem', marginBottom: '1rem' }}>
                      {intelligence.keyBarriers.map((barrier, i) => <li key={i}>{barrier}</li>)}
                    </ul>
                  </>
                )}
              </ReviewCard>

              <ReviewCard title="Next Steps">
                {intelligence.pendingActions?.length > 0 && (
                  <>
                    <h3>Pending Actions</h3>
                    <ul style={{ paddingLeft: '1.2rem', marginBottom: '1rem' }}>
                      {intelligence.pendingActions.map((action, i) => <li key={i}>{action}</li>)}
                    </ul>
                  </>
                )}
                
                <h3>Recommended Coach Action</h3>
                <p>{intelligence.recommendedNextAction}</p>
              </ReviewCard>
            </div>
            
            <div className="col-span-full">
              <ReviewCard title="Supporting Evidence">
                <ul className="evidence-list">
                  {intelligence.supportingEvidence?.map((evidence, i) => (
                    <li key={i} className="evidence-item">
                      <div style={{ marginBottom: '0.5rem' }}>
                        <Tag type={evidence.sourceType} />
                        <strong>{evidence.claim}</strong>
                      </div>
                      <div className="evidence-quote">"{evidence.quote}"</div>
                    </li>
                  ))}
                </ul>
              </ReviewCard>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default App
