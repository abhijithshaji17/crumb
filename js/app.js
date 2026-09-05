/* ============================================================
   CRUMB — Main Application Logic (app.js)
   Offline Knowledge Preservation System & Memory Bread Engine
   ============================================================ */

(function () {
  "use strict";

  // ------------------------------------------------------------
  // 1. PRE-LOADED KNOWLEDGE VAULT DATA (Offline Library)
  // ------------------------------------------------------------
  const INITIAL_LIBRARY = [
    {
      id: "engineering",
      title: "Engineering Fundamentals",
      category: "Computer Science & Mechanics",
      icon: "⚙️",
      gradient: "linear-gradient(150deg, #3d7ec9, #24518f)",
      docCount: 4,
      pages: 142,
      lastImprinted: "Today",
      tags: ["Dijkstra", "Ohm's Law", "Algorithms", "Structures"],
      content: [
        {
          topic: "Dijkstra's Algorithm",
          summary: "Finds the shortest path between nodes in a weighted graph with non-negative edge costs.",
          text: `Dijkstra's Algorithm is a greedy single-source shortest path algorithm. 
1. Initialize distances: set distance to start node = 0, and all other nodes = infinity.
2. Use a Min-Priority Queue to extract the unvisited node u with the smallest distance.
3. For each neighbor v of u: calculate new distance alt = dist[u] + weight(u, v).
4. If alt < dist[v], update dist[v] = alt and record u as the predecessor of v.
5. Repeat until the priority queue is empty or destination node is visited.
Time Complexity: O((V + E) log V) using a binary heap priority queue. Space Complexity: O(V).`,
          takeaways: [
            "Requires all edge weights to be non-negative (use Bellman-Ford for negative weights).",
            "Binary heap implementation reduces time complexity to O((V+E) log V).",
            "Widely used in network routing protocols (OSPF, IS-IS) and GPS navigation."
          ],
          flashcards: [
            {
              front: "What is the time complexity of Dijkstra's Algorithm using a Binary Heap?",
              back: "O((V + E) log V) where V is vertices and E is edges."
            },
            {
              front: "Why does Dijkstra's algorithm fail on graphs with negative edge weights?",
              back: "Because it greedily assumes once a vertex distance is finalized, it can never be reduced further."
            }
          ],
          quiz: {
            question: "Which data structure optimizes Dijkstra's algorithm to run in O((V + E) log V) time?",
            options: [
              "Standard Queue (FIFO)",
              "Min-Priority Queue (Heap)",
              "Stack (LIFO)",
              "Hash Map only"
            ],
            correct: 1,
            explanation: "A Min-Priority Queue allows extracting the node with the minimum distance in O(log V) time."
          }
        },
        {
          topic: "Ohm's Law & Circuit Basics",
          summary: "Fundamental relationship between voltage, current, and resistance in electrical circuits.",
          text: `Ohm's Law states: V = I × R, where V is Potential Difference (Volts), I is Current (Amperes), and R is Resistance (Ohms).
- Series Circuits: Total Resistance R_total = R1 + R2 + R3. Current I remains constant through all components.
- Parallel Circuits: 1/R_total = 1/R1 + 1/R2 + 1/R3. Voltage V remains constant across all branches.
- Electrical Power: P = V × I = I² × R = V² / R (Watts).`,
          takeaways: [
            "Voltage is electrical pressure; current is rate of flow; resistance opposes flow.",
            "Power dissipated as heat increases quadratically with current (P = I²R).",
            "Kirchhoff's Current Law (KCL): Total current entering a junction equals total current leaving."
          ],
          flashcards: [
            {
              front: "Formula for Power in terms of Voltage and Resistance?",
              back: "P = V² / R (also P = V × I or P = I² × R)."
            },
            {
              front: "How does total resistance behave in a parallel circuit?",
              back: "Total resistance is always LESS than the smallest individual resistor."
            }
          ],
          quiz: {
            question: "If a 12V battery is connected across a 4Ω resistor, what current flows through the circuit?",
            options: ["48 Amps", "3 Amps", "0.33 Amps", "16 Amps"],
            correct: 1,
            explanation: "Using I = V / R: 12V / 4Ω = 3 Amps."
          }
        }
      ]
    },
    {
      id: "medicine",
      title: "Medical & First Aid Protocols",
      category: "Emergency Care & Clinical Triage",
      icon: "✚",
      gradient: "linear-gradient(150deg, #c05a4a, #8f2f24)",
      docCount: 5,
      pages: 210,
      lastImprinted: "Yesterday",
      tags: ["CPR", "Triage", "Wound Care", "Heat Exhaustion"],
      content: [
        {
          topic: "CPR & Basic Life Support (BLS)",
          summary: "Life-saving emergency protocol for cardiac arrest victims.",
          text: `CPR (Cardiopulmonary Resuscitation) Protocol for Adults:
1. Verify scene safety and check responsiveness. Call for emergency help or AED.
2. Check carotid pulse and breathing simultaneously for 5–10 seconds.
3. If no pulse or normal breathing: begin chest compressions immediately.
4. Compression rate: 100 to 120 compressions per minute (tempo of 'Stayin' Alive').
5. Compression depth: At least 2 inches (5 cm) for adults, allowing full chest recoil.
6. Compression to ventilation ratio: 30 compressions to 2 rescue breaths.
7. Apply AED as soon as available and follow vocal prompts.`,
          takeaways: [
            "High-quality chest compressions are the single most critical component of CPR.",
            "Compression rate must be 100–120 bpm; depth at least 2 inches.",
            "Minimize interruptions in chest compressions to maintain coronary perfusion pressure."
          ],
          flashcards: [
            {
              front: "What is the adult CPR compression-to-breath ratio for a single rescuer?",
              back: "30 chest compressions to 2 rescue breaths."
            },
            {
              front: "Target rate for CPR chest compressions per minute?",
              back: "100 to 120 compressions per minute."
            }
          ],
          quiz: {
            question: "When performing CPR on an adult, how deep should chest compressions be?",
            options: ["1 inch (2.5 cm)", "At least 2 inches (5 cm)", "3.5 inches (9 cm)", "Only 0.5 inches"],
            correct: 1,
            explanation: "Chest compressions for adults must be at least 2 inches (5 cm) deep to effectively squeeze heart ventricles."
          }
        },
        {
          topic: "Heat Exhaustion vs Heat Stroke",
          summary: "Distinguishing and treating heat-related hyperthermia emergencies.",
          text: `Heat Exhaustion: Heavy sweating, pale/cool skin, dizziness, nausea, fast weak pulse.
Treatment: Move to shade/AC, loosen clothing, sip cold water or electrolyte solution, cool compresses.

Heat Stroke (MEDICAL EMERGENCY): High body temp (>104°F/40°C), altered mental state/confusion, hot RED dry skin or heavy sweating, rapid strong pulse, loss of consciousness.
Treatment: Call emergency services immediately. Rapid cooling is top priority: submerge in ice water bath or cover with cold wet sheets and fan aggressively. DO NOT give oral fluids if confused.`,
          takeaways: [
            "Confusion or altered mental status indicates HEAT STROKE, requiring immediate emergency cooling.",
            "Cooling body temperature takes precedence over transport in heat stroke cases.",
            "Oral rehydration formula: 1 liter clean water + 6 level tsp sugar + 1/2 tsp salt."
          ],
          flashcards: [
            {
              front: "Key symptom distinguishing Heat Stroke from Heat Exhaustion?",
              back: "Altered mental status/confusion and elevated body temp >104°F (40°C)."
            },
            {
              front: "What is the emergency oral rehydration ratio for salt and sugar?",
              back: "1 Liter clean water + 6 tsp sugar + 1/2 tsp salt."
            }
          ],
          quiz: {
            question: "What is the single most critical intervention for a patient experiencing Heat Stroke?",
            options: [
              "Give 2 liters of plain water to drink quickly",
              "Immediate rapid cooling (ice bath or wet sheets with fanning)",
              "Give aspirin or fever medication",
              "Keep victim walking to maintain blood flow"
            ],
            correct: 1,
            explanation: "Rapid cooling reduces core body temperature quickly to prevent permanent brain and organ damage."
          }
        }
      ]
    },
    {
      id: "survival",
      title: "Wilderness & Urban Survival",
      category: "Disaster Preparedness & Off-Grid Living",
      icon: "▲",
      gradient: "linear-gradient(150deg, #5aa94f, #2e6b26)",
      docCount: 6,
      pages: 188,
      lastImprinted: "3 days ago",
      tags: ["Water Purification", "Shelter", "Navigation", "Fire"],
      content: [
        {
          topic: "Emergency Water Purification Methods",
          summary: "Making non-potable water safe for human consumption without grid power.",
          text: `1. Boiling: The safest method. Bring water to a rolling boil for 1 full minute at sea level (3 minutes at elevations above 6,500ft / 2,000m). Kills all bacteria, viruses, and parasites.
2. Chemical Disinfection (Unscented Household Bleach - 6% Sodium Hypochlorite):
   - Add 2 drops of bleach per liter (8 drops per gallon) of clear water.
   - Double dosage (4 drops/liter) if water is cloudy or cold.
   - Stir and let stand covered for 30 minutes. Water should have slight chlorine smell.
3. SODIS (Solar Water Disinfection): Fill clear PET plastic bottles with water and expose to direct sunlight for 6 hours (or 2 days if cloudy). UV-A light destroys pathogens.
4. DIY Filtration: Layer coarse gravel -> fine sand -> crushed charcoal -> fabric. Filters sediment & heavy odors, but MUST be boiled afterwards to kill microbes.`,
          takeaways: [
            "Boiling for 1 minute kills 100% of pathogens including cryptosporidium.",
            "Standard liquid household bleach ratio: 2 drops per liter of clear water, sit 30 min.",
            "DIY sand/charcoal filter removes particulates but requires disinfection after."
          ],
          flashcards: [
            {
              front: "How long should water be boiled at sea level for complete sterilization?",
              back: "1 full minute at a rolling boil (3 minutes above 6,500ft)."
            },
            {
              front: "How many drops of 6% unscented bleach are required to purify 1 Liter of clear water?",
              back: "2 drops per liter (wait 30 minutes)."
            }
          ],
          quiz: {
            question: "How long must clear water in PET bottles be exposed to sunlight under the SODIS method?",
            options: ["30 minutes", "6 hours in direct sunlight", "24 hours in shade", "10 minutes"],
            correct: 1,
            explanation: "6 hours of direct sunlight provides sufficient UV-A radiation to disinfect clear water in PET bottles."
          }
        },
        {
          topic: "Debris Hut Shelter Construction",
          summary: "Building an insulated emergency thermal shelter without tools.",
          text: `A Debris Hut provides thermal insulation by trapping dead air space around your body.
1. Ridgepole: Select a sturdy branch 9-10 ft long. Prop one end onto a stump or tripod (~3 ft high).
2. Ribs: Lean sticks along both sides of the ridgepole at a 45° angle to create a snug wedge frame just wider than your body.
3. Lathing: WEAVE smaller branches across the ribs to prevent debris from falling through.
4. Insulation Layer: Pile leaves, pine needles, or dry moss over the frame to a thickness of AT LEAST 3 FEET (36 inches).
5. Bedding: Fill the inside floor with 1 foot of dry leaves to insulate against ground cold loss.`,
          takeaways: [
            "Insulation thickness should be at least 3 feet to retain body heat in freezing weather.",
            "Ground insulation under your body is as critical as overhead shelter.",
            "Keep interior volume small so body heat warms the air quickly."
          ],
          flashcards: [
            {
              front: "Recommended minimum thickness for debris hut leaf insulation?",
              back: "At least 3 feet (36 inches) thick."
            },
            {
              front: "Why is ground bedding inside a shelter critical?",
              back: "Prevents conduction heat loss into the cold ground."
            }
          ],
          quiz: {
            question: "What is the main physical mechanism by which a debris hut keeps you warm?",
            options: [
              "Reflecting radiant heat from fires",
              "Trapping dead air space within thick debris layers",
              "Generating chemical heat from decomposing leaves",
              "Blocking sunlight exposure"
            ],
            correct: 1,
            explanation: "Thick layers of dry debris trap dead air pockets, minimizing convective and conductive heat loss."
          }
        }
      ]
    },
    {
      id: "electronics",
      title: "Electronics & Off-Grid Power",
      category: "Hardware & Renewable Systems",
      icon: "⚡",
      gradient: "linear-gradient(150deg, #b8863a, #7a5117)",
      docCount: 3,
      pages: 115,
      lastImprinted: "5 days ago",
      tags: ["Solar", "Batteries", "Soldering", "Pinouts"],
      content: [
        {
          topic: "Off-Grid Solar & Battery Setup",
          summary: "Sizing solar panels, charge controllers, and battery banks for offline power resilience.",
          text: `Component Chain: Solar Panel -> Charge Controller (MPPT) -> Battery Bank -> Inverter / DC Load.
- MPPT vs PWM Charge Controllers: MPPT (Maximum Power Point Tracking) is up to 30% more efficient than PWM in cold or cloudy conditions by converting excess panel voltage into current.
- LiFePO4 vs Lead-Acid: Lithium Iron Phosphate (LiFePO4) allows 80-90% Depth of Discharge (DOD) with 3000+ cycles. Lead-acid should only be discharged to 50% DOD.
- Daily Watt-Hour Calculation: Total Load (Watts) × Hours of runtime. E.g., 50W laptop × 6 hrs = 300 Wh.
- Solar Array Sizing: Daily Wh needed / Peak Sun Hours (e.g., 300 Wh / 4 hrs = 75W panel minimum).`,
          takeaways: [
            "MPPT charge controllers optimize solar harvest efficiency by matching V-I curves.",
            "LiFePO4 batteries offer longer life and deeper usable capacity (80%+ DOD).",
            "Always include inline fuses near battery positive terminals to prevent electrical fires."
          ],
          flashcards: [
            {
              front: "Max safe Depth of Discharge (DOD) for Lead-Acid vs LiFePO4 batteries?",
              back: "Lead-Acid: 50% max DOD. LiFePO4: 80–90% usable DOD."
            },
            {
              front: "Why is MPPT preferred over PWM solar charge controllers?",
              back: "MPPT converts excess voltage into additional current, harvesting up to 30% more power."
            }
          ],
          quiz: {
            question: "How many Watt-hours are consumed by running a 40W radio for 5 hours?",
            options: ["8 Wh", "200 Wh", "800 Wh", "40 Wh"],
            correct: 1,
            explanation: "Energy (Wh) = Power (W) × Time (h) = 40W × 5h = 200 Wh."
          }
        }
      ]
    },
    {
      id: "notes",
      title: "Personal Notes & System Manual",
      category: "Local Vault & Architecture",
      icon: "📝",
      gradient: "linear-gradient(150deg, #7c5ac9, #4a2f8f)",
      docCount: 2,
      pages: 45,
      lastImprinted: "Just now",
      tags: ["CRUMB", "Offline Brain", "Vault Specs"],
      content: [
        {
          topic: "CRUMB Offline Second Brain Architecture",
          summary: "System design for local knowledge preservation inspired by Memory Bread.",
          text: `CRUMB operates on a 100% Zero-Cloud Architecture:
1. Local Knowledge Slices: Digital representations of books/documents stored directly in browser IndexedDB/LocalStorage.
2. Memory Tray Activation: Users load active slices into the Memory Tray, scoping local AI context.
3. Offline Reasoning Engine: Performs client-side semantic keyword search and synthesis without external network requests.
4. Memory Imprint System: Automatically bakes active documents into Flashcards, Quizzes, Summaries, and Knowledge Graphs for human retention.
"A crumb of knowledge. A lifetime of memory."`,
          takeaways: [
            "Zero network dependencies ensure total privacy and blackout resilience.",
            "Memory Tray provides scoped context for fast, targeted answers.",
            "Imprint views turn passive reading into active memory testing."
          ],
          flashcards: [
            {
              front: "What is CRUMB's core mission?",
              back: "Preserve human knowledge locally and allow offline retrieval & learning when the internet disappears."
            }
          ],
          quiz: {
            question: "What visual metaphor inspires CRUMB's knowledge management system?",
            options: [
              "Floppy Disks",
              "Doraemon's Memory Bread (Knowledge Slices)",
              "Cloud Server Farms",
              "Magnetic Tapes"
            ],
            correct: 1,
            explanation: "CRUMB is inspired by Doraemon's Memory Bread, representing documents as digital bread slices baked into memory."
          }
        }
      ]
    }
  ];

  // ------------------------------------------------------------
  // 2. STATE MANAGEMENT
  // ------------------------------------------------------------
  let libraryData = JSON.parse(JSON.stringify(INITIAL_LIBRARY));
  let activeTrayIds = new Set(["engineering", "survival"]); // Default active slices
  let emergencyMode = false;
  let conversationHistory = [];
  let currentActiveImprintTopic = null;
  let flashcardIndex = 0;
  let currentFlashcards = [];
  let currentQuiz = null;
  let flashcardScore = { easy: 0, again: 0 };

  // ------------------------------------------------------------
  // 3. DOM ELEMENTS
  // ------------------------------------------------------------
  const elSlicesList = document.getElementById("slicesList");
  const elTrayDropzone = document.getElementById("trayDropzone");
  const elTrayBar = document.getElementById("trayBar");
  const elTrayCountText = document.getElementById("trayCountText");
  const elConversationArea = document.getElementById("conversationArea");
  const elChatForm = document.getElementById("chatForm");
  const elChatInput = document.getElementById("chatInput");
  const elSearchInput = document.getElementById("searchInput");
  const elBtnEmergency = document.getElementById("btnEmergency");
  const elViewport = document.getElementById("appViewport");
  const elModal = document.getElementById("uploadModal");
  const elBtnUpload = document.getElementById("btnUploadSlice");
  const elCloseModal = document.getElementById("closeModal");
  const elUploadDropzone = document.getElementById("uploadDropzone");
  const elFileInput = document.getElementById("fileInput");

  // Imprint panel elements
  const elTabBtns = document.querySelectorAll(".tab-btn");
  const elTabPanels = document.querySelectorAll(".tab-panel");
  const elTakeawayContent = document.getElementById("takeawayContent");
  const elFlashcardFrontText = document.getElementById("flashcardFrontText");
  const elFlashcardBackText = document.getElementById("flashcardBackText");
  const elFlashcardTopic = document.getElementById("flashcardTopic");
  const elFlashcardInner = document.getElementById("flashcardInner");
  const elBtnEasy = document.getElementById("btnEasy");
  const elBtnAgain = document.getElementById("btnAgain");
  const elScoreEasy = document.getElementById("scoreEasy");
  const elScoreAgain = document.getElementById("scoreAgain");
  const elQuizQuestion = document.getElementById("quizQuestion");
  const elQuizOptions = document.getElementById("quizOptions");
  const elQuizFeedback = document.getElementById("quizFeedback");
  const elGraphCanvas = document.getElementById("graphCanvas");

  // ------------------------------------------------------------
  // 4. RENDER LIBRARY SLICES (Left Sidebar)
  // ------------------------------------------------------------
  function renderLibrarySlices(filterQuery = "") {
    if (!elSlicesList) return;
    elSlicesList.innerHTML = "";

    const q = filterQuery.toLowerCase().trim();
    const filtered = libraryData.filter(item => {
      return (
        item.title.toLowerCase().includes(q) ||
        item.category.toLowerCase().includes(q) ||
        item.tags.some(t => t.toLowerCase().includes(q))
      );
    });

    if (filtered.length === 0) {
      elSlicesList.innerHTML = `<div style="text-align:center; padding:30px 10px; color:var(--ink-soft); font-size:0.85rem;">No knowledge slices matched "${filterQuery}".<br/><br/>Click "Add Knowledge Slice" to upload a document!</div>`;
      return;
    }

    filtered.forEach(item => {
      const isInTray = activeTrayIds.has(item.id);
      const card = document.createElement("div");
      card.className = `slice-item ${isInTray ? "in-tray" : ""}`;
      card.setAttribute("draggable", "true");
      card.setAttribute("data-id", item.id);

      card.innerHTML = `
        <div class="slice-active-dot">✓</div>
        <div class="slice-icon" style="background:${item.gradient}">${item.icon}</div>
        <div class="slice-content">
          <div class="slice-title">${item.title}</div>
          <div class="slice-sub">${item.docCount} docs · ${item.pages} pages</div>
        </div>
      `;

      // Click to toggle in/out of tray
      card.addEventListener("click", () => toggleSliceInTray(item.id));

      // Dragstart event
      card.addEventListener("dragstart", (e) => {
        card.classList.add("dragging");
        e.dataTransfer.setData("text/plain", item.id);
        e.dataTransfer.effectAllowed = "move";
      });

      card.addEventListener("dragend", () => {
        card.classList.remove("dragging");
      });

      elSlicesList.appendChild(card);
    });
  }

  // ------------------------------------------------------------
  // 5. MEMORY TRAY LOGIC
  // ------------------------------------------------------------
  function toggleSliceInTray(id) {
    if (activeTrayIds.has(id)) {
      activeTrayIds.delete(id);
      showToast(`Removed from Memory Tray`);
    } else {
      activeTrayIds.add(id);
      showToast(`Added to Memory Tray`);
    }
    updateMemoryTrayUI();
    renderLibrarySlices(elSearchInput ? elSearchInput.value : "");
    updateImprintView();
  }

  function updateMemoryTrayUI() {
    if (!elTrayDropzone) return;
    elTrayDropzone.innerHTML = "";

    if (activeTrayIds.size === 0) {
      elTrayBar.classList.remove("glow");
      elTrayCountText.textContent = "0 active sources";
      elTrayDropzone.innerHTML = `<span class="tray-empty-hint">Tray empty — drag or click slices from left library to activate offline context</span>`;
      return;
    }

    elTrayBar.classList.add("glow");
    elTrayCountText.textContent = `${activeTrayIds.size} active source${activeTrayIds.size > 1 ? "s" : ""}`;

    activeTrayIds.forEach(id => {
      const item = libraryData.find(lib => lib.id === id);
      if (!item) return;

      const chip = document.createElement("span");
      chip.className = "tray-chip";
      chip.innerHTML = `
        <span>${item.icon}</span>
        <span>${item.title}</span>
        <span class="tray-chip-remove" title="Remove slice">✕</span>
      `;

      chip.querySelector(".tray-chip-remove").addEventListener("click", (e) => {
        e.stopPropagation();
        toggleSliceInTray(id);
      });

      elTrayDropzone.appendChild(chip);
    });
  }

  // Set up Drag & Drop onto Tray Dropzone
  if (elTrayDropzone) {
    elTrayDropzone.addEventListener("dragover", (e) => {
      e.preventDefault();
      elTrayDropzone.classList.add("drag-over");
    });

    elTrayDropzone.addEventListener("dragleave", () => {
      elTrayDropzone.classList.remove("drag-over");
    });

    elTrayDropzone.addEventListener("drop", (e) => {
      e.preventDefault();
      elTrayDropzone.classList.remove("drag-over");
      const id = e.dataTransfer.getData("text/plain");
      if (id && !activeTrayIds.has(id)) {
        toggleSliceInTray(id);
      }
    });
  }

  // ------------------------------------------------------------
  // 6. CHAT & OFFLINE REASONING ENGINE
  // ------------------------------------------------------------
  function handleUserQuery(queryText) {
    if (!queryText.trim()) return;

    // Append User Message
    appendChatMessage("user", queryText);
    if (elChatInput) elChatInput.value = "";

    // Show simulated assistant typing indicator
    const typingId = appendTypingIndicator();

    // Perform local offline reasoning search
    setTimeout(() => {
      removeTypingIndicator(typingId);
      const answerObj = generateOfflineAnswer(queryText);
      appendChatMessage("assistant", answerObj.text, answerObj.meta);

      // Trigger active memory imprint topic update
      if (answerObj.matchedTopicObj) {
        setImprintTopic(answerObj.matchedTopicObj);
      }
    }, 750);
  }

  function generateOfflineAnswer(query) {
    const q = query.toLowerCase();

    // Determine active content sources from Memory Tray
    let activeSources = libraryData.filter(lib => activeTrayIds.has(lib.id));
    let usedFallback = false;

    if (activeSources.length === 0) {
      activeSources = libraryData; // Fallback to full library if tray is empty
      usedFallback = true;
    }

    // Flatten all topics inside active sources
    const allTopics = [];
    activeSources.forEach(source => {
      source.content.forEach(topic => {
        allTopics.push({ ...topic, sourceTitle: source.title, sourceIcon: source.icon });
      });
    });

    // Score topics by keyword match
    let bestTopic = null;
    let maxScore = 0;

    allTopics.forEach(topic => {
      let score = 0;
      const topicName = topic.topic.toLowerCase();
      const topicSummary = topic.summary.toLowerCase();
      const topicText = topic.text.toLowerCase();

      if (topicName.split(" ").some(w => w.length > 3 && q.includes(w))) score += 5;
      if (q.includes(topicName)) score += 10;
      if (topicSummary.split(" ").some(w => w.length > 3 && q.includes(w))) score += 2;
      topic.takeaways.forEach(t => { if (q.includes(t.toLowerCase())) score += 3; });

      if (score > maxScore) {
        maxScore = score;
        bestTopic = topic;
      }
    });

    if (!bestTopic && allTopics.length > 0) {
      bestTopic = allTopics[Math.floor(Math.random() * allTopics.length)];
    }

    // Build synthesized response
    let responseText = "";
    if (bestTopic) {
      responseText = `### ${bestTopic.topic}\n\n${bestTopic.text}\n\n#### Key Takeaways:\n` +
        bestTopic.takeaways.map(t => `- ${t}`).join("\n");
    } else {
      responseText = `No direct match found for "${query}" in active slices.\n\nTry selecting additional collections in the Memory Tray or adding a document slice.`;
    }

    const sourceNames = activeSources.map(s => s.title).join(", ");
    const metaNote = usedFallback
      ? `Full Vault Search · Offline`
      : `Source: ${sourceNames}`;

    return {
      text: responseText,
      meta: metaNote,
      matchedTopicObj: bestTopic
    };
  }

  function appendChatMessage(role, text, metaText = "") {
    if (!elConversationArea) return;

    // Remove welcome card if it exists
    const welcome = elConversationArea.querySelector(".chat-welcome");
    if (welcome) welcome.remove();

    const row = document.createElement("div");
    row.className = `message-row ${role}`;

    const avatarHtml = role === "user"
      ? `<div class="message-avatar user-avatar">YOU</div>`
      : `<div class="message-avatar assistant-avatar">🍞</div>`;

    // Simple markdown formatting replacement for bold, code, headings
    let formattedText = text
      .replace(/### (.*?)\n/g, '<h3 style="font-family:var(--font-display); font-size:1.15rem; margin:6px 0 10px; color:var(--navy);">$1</h3>')
      .replace(/#### (.*?)\n/g, '<h4 style="font-size:0.95rem; margin:10px 0 6px; color:var(--crust);">$1</h4>')
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/\n\n/g, '<br/><br/>')
      .replace(/- (.*?)(<br\/>|$)/g, '<li style="margin-left:16px;">$1</li>');

    const metaHtml = metaText
      ? `<div class="message-meta"><span class="offline-badge-sm">OFFLINE</span><span>${metaText}</span></div>`
      : "";

    row.innerHTML = `
      ${avatarHtml}
      <div class="message-bubble">
        <div>${formattedText}</div>
        ${metaHtml}
      </div>
    `;

    elConversationArea.appendChild(row);
    elConversationArea.scrollTop = elConversationArea.scrollHeight;
  }

  function appendTypingIndicator() {
    if (!elConversationArea) return null;
    const id = "typing_" + Date.now();
    const row = document.createElement("div");
    row.className = "message-row assistant";
    row.id = id;

    row.innerHTML = `
      <div class="message-avatar assistant-avatar">🍞</div>
      <div class="message-bubble" style="padding:14px 20px;">
        <div class="mini-ai" style="width:60px;">
          <span></span><span></span><span></span>
        </div>
      </div>
    `;
    elConversationArea.appendChild(row);
    elConversationArea.scrollTop = elConversationArea.scrollHeight;
    return id;
  }

  function removeTypingIndicator(id) {
    if (!id) return;
    const el = document.getElementById(id);
    if (el) el.remove();
  }

  // Handle Chat Form Submit
  if (elChatForm) {
    elChatForm.addEventListener("submit", (e) => {
      e.preventDefault();
      if (elChatInput) handleUserQuery(elChatInput.value);
    });
  }

  // Handle Preset Prompt Chip Clicks
  document.addEventListener("click", (e) => {
    const btn = e.target.closest("[data-prompt]");
    if (btn) {
      const promptText = btn.getAttribute("data-prompt");
      handleUserQuery(promptText);
    }
  });

  // ------------------------------------------------------------
  // 7. MEMORY IMPRINT PANEL (Right Panel)
  // ------------------------------------------------------------
  function setImprintTopic(topicObj) {
    if (!topicObj) return;
    currentActiveImprintTopic = topicObj;

    // 1. Takeaways
    if (elTakeawayContent) {
      elTakeawayContent.innerHTML = `
        <div class="takeaway-card">
          <div class="takeaway-header">
            <span class="takeaway-tag">${topicObj.sourceIcon || "🍞"} ${topicObj.topic}</span>
            <span style="font-size:0.75rem; color:var(--ink-soft);">Imprinted</span>
          </div>
          <p style="font-size:0.9rem; margin-bottom:12px; font-weight:500;">${topicObj.summary}</p>
          <ul class="takeaway-list">
            ${topicObj.takeaways ? topicObj.takeaways.map(t => `<li>${t}</li>`).join("") : "<li>Key concepts stored locally in vault.</li>"}
          </ul>
        </div>
      `;
    }

    // 2. Flashcards
    if (topicObj.flashcards && topicObj.flashcards.length > 0) {
      currentFlashcards = topicObj.flashcards;
      flashcardIndex = 0;
      renderCurrentFlashcard();
    }

    // 3. Quiz
    if (topicObj.quiz) {
      currentQuiz = topicObj.quiz;
      renderCurrentQuiz();
    }

    // 4. Update Knowledge Graph Canvas
    drawKnowledgeGraph(topicObj.topic);
  }

  function updateImprintView() {
    // Find active topic from tray or library
    let activeLib = libraryData.find(l => activeTrayIds.has(l.id));
    if (!activeLib) activeLib = libraryData[0];
    if (activeLib && activeLib.content && activeLib.content[0]) {
      setImprintTopic(activeLib.content[0]);
    }
  }

  function renderCurrentFlashcard() {
    if (!currentFlashcards || currentFlashcards.length === 0) return;
    const card = currentFlashcards[flashcardIndex];

    if (elFlashcardFrontText) elFlashcardFrontText.textContent = card.front;
    if (elFlashcardBackText) elFlashcardBackText.textContent = card.back;
    if (elFlashcardTopic) elFlashcardTopic.textContent = `Card ${flashcardIndex + 1} of ${currentFlashcards.length}`;

    if (elFlashcardInner) elFlashcardInner.classList.remove("flipped");
  }

  // Flashcard Flip & Score
  if (elFlashcardInner) {
    elFlashcardInner.addEventListener("click", () => {
      elFlashcardInner.classList.toggle("flipped");
    });
  }

  if (elBtnEasy) {
    elBtnEasy.addEventListener("click", (e) => {
      e.stopPropagation();
      flashcardScore.easy++;
      if (elScoreEasy) elScoreEasy.textContent = flashcardScore.easy;
      nextFlashcard();
    });
  }

  if (elBtnAgain) {
    elBtnAgain.addEventListener("click", (e) => {
      e.stopPropagation();
      flashcardScore.again++;
      if (elScoreAgain) elScoreAgain.textContent = flashcardScore.again;
      nextFlashcard();
    });
  }

  function nextFlashcard() {
    if (currentFlashcards.length > 0) {
      flashcardIndex = (flashcardIndex + 1) % currentFlashcards.length;
      renderCurrentFlashcard();
    }
  }

  // Render Quiz
  function renderCurrentQuiz() {
    if (!currentQuiz || !elQuizQuestion || !elQuizOptions) return;

    elQuizQuestion.textContent = currentQuiz.question;
    elQuizOptions.innerHTML = "";
    if (elQuizFeedback) {
      elQuizFeedback.className = "quiz-feedback";
      elQuizFeedback.style.display = "none";
    }

    currentQuiz.options.forEach((optText, idx) => {
      const btn = document.createElement("button");
      btn.className = "quiz-option-btn";
      btn.textContent = `${String.fromCharCode(65 + idx)}. ${optText}`;

      btn.addEventListener("click", () => {
        // Disable all options
        const allBtns = elQuizOptions.querySelectorAll(".quiz-option-btn");
        allBtns.forEach(b => b.disabled = true);

        if (idx === currentQuiz.correct) {
          btn.classList.add("correct");
          showQuizFeedback("true", `Correct! ${currentQuiz.explanation}`);
        } else {
          btn.classList.add("incorrect");
          if (allBtns[currentQuiz.correct]) allBtns[currentQuiz.correct].classList.add("correct");
          showQuizFeedback("false", `Incorrect. ${currentQuiz.explanation}`);
        }
      });

      elQuizOptions.appendChild(btn);
    });
  }

  function showQuizFeedback(isSuccess, text) {
    if (!elQuizFeedback) return;
    elQuizFeedback.style.display = "block";
    elQuizFeedback.className = `quiz-feedback ${isSuccess === "true" ? "success" : "error"}`;
    elQuizFeedback.textContent = text;
  }

  // Tab Switcher
  elTabBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      const target = btn.getAttribute("data-tab");
      elTabBtns.forEach(b => b.classList.remove("active"));
      elTabPanels.forEach(p => p.style.display = "none");

      btn.classList.add("active");
      const activePanel = document.getElementById(`tab-${target}`);
      if (activePanel) activePanel.style.display = "block";

      if (target === "graph") {
        drawKnowledgeGraph(currentActiveImprintTopic ? currentActiveImprintTopic.topic : "CRUMB Vault");
      }
    });
  });

  // ------------------------------------------------------------
  // 8. KNOWLEDGE GRAPH CANVAS DRAWING
  // ------------------------------------------------------------
  function drawKnowledgeGraph(centerLabel = "Knowledge Vault") {
    if (!elGraphCanvas) return;
    const ctx = elGraphCanvas.getContext("2d");
    const rect = elGraphCanvas.getBoundingClientRect();
    const dpr = window.devicePixelRatio || 1;

    elGraphCanvas.width = rect.width * dpr;
    elGraphCanvas.height = rect.height * dpr;
    ctx.scale(dpr, dpr);

    const w = rect.width;
    const h = rect.height;
    const cx = w / 2;
    const cy = h / 2;

    ctx.clearRect(0, 0, w, h);

    // Nodes
    const nodes = [
      { x: cx, y: cy, r: 24, label: centerLabel, color: "#eda63e", isCenter: true },
      { x: cx - 90, y: cy - 70, r: 16, label: "Algorithms", color: "#3d7ec9" },
      { x: cx + 95, y: cy - 65, r: 16, label: "Protocols", color: "#c05a4a" },
      { x: cx - 85, y: cy + 75, r: 16, label: "Survival", color: "#5aa94f" },
      { x: cx + 85, y: cy + 75, r: 16, label: "Imprint", color: "#b8863a" }
    ];

    // Draw connecting lines
    ctx.lineWidth = 1.5;
    nodes.forEach(node => {
      if (!node.isCenter) {
        ctx.strokeStyle = "rgba(237, 166, 62, 0.4)";
        ctx.beginPath();
        ctx.moveTo(cx, cy);
        ctx.lineTo(node.x, node.y);
        ctx.stroke();
      }
    });

    // Draw nodes
    nodes.forEach(node => {
      ctx.fillStyle = node.color;
      ctx.shadowColor = node.color;
      ctx.shadowBlur = node.isCenter ? 16 : 8;

      ctx.beginPath();
      ctx.arc(node.x, node.y, node.r, 0, Math.PI * 2);
      ctx.fill();

      ctx.shadowBlur = 0;
      ctx.fillStyle = node.isCenter ? "#1c1205" : "#ffffff";
      ctx.font = node.isCenter ? "600 11px Inter" : "500 10px Inter";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";

      const truncText = node.label.length > 12 ? node.label.substring(0, 10) + ".." : node.label;
      ctx.fillText(truncText, node.x, node.y);
    });
  }

  // ------------------------------------------------------------
  // 9. FILE UPLOAD & CUSTOM SLICE GENERATOR
  // ------------------------------------------------------------
  if (elBtnUpload) {
    elBtnUpload.addEventListener("click", () => {
      if (elModal) elModal.classList.add("active");
    });
  }

  if (elCloseModal) {
    elCloseModal.addEventListener("click", () => {
      if (elModal) elModal.classList.remove("active");
    });
  }

  if (elUploadDropzone && elFileInput) {
    elUploadDropzone.addEventListener("click", () => elFileInput.click());

    elFileInput.addEventListener("change", (e) => {
      const file = e.target.files[0];
      if (file) processUploadedFile(file);
    });

    elUploadDropzone.addEventListener("dragover", (e) => {
      e.preventDefault();
      elUploadDropzone.style.borderColor = "var(--amber-bright)";
    });
    elUploadDropzone.addEventListener("dragleave", () => {
      elUploadDropzone.style.borderColor = "var(--line)";
    });
    elUploadDropzone.addEventListener("drop", (e) => {
      e.preventDefault();
      elUploadDropzone.style.borderColor = "var(--line)";
      const file = e.dataTransfer.files[0];
      if (file) processUploadedFile(file);
    });
  }

  async function processUploadedFile(file) {
    const title = file.name.replace(/\.[^/.]+$/, "");
    let extractedText = "";
    let totalPages = 1;

    showToast(`Indexing & baking "${title}"... 🍞`);

    const isPdf = file.type === "application/pdf" || file.name.toLowerCase().endsWith(".pdf");

    if (isPdf) {
      try {
        const arrayBuffer = await file.arrayBuffer();
        if (window.pdfjsLib) {
          const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
          totalPages = pdf.numPages || 1;
          let fullText = [];

          for (let i = 1; i <= pdf.numPages; i++) {
            const page = await pdf.getPage(i);
            const textContent = await page.getTextContent();
            const pageStrings = textContent.items.map(item => item.str);
            fullText.push(`--- Page ${i} ---\n` + pageStrings.join(" "));
          }

          extractedText = fullText.join("\n\n");
        } else {
          // Fallback binary stream cleaner if pdfjsLib is unavailable
          const decoder = new TextDecoder("utf-8", { fatal: false });
          const rawStr = decoder.decode(arrayBuffer);
          extractedText = cleanRawPdfString(rawStr);
        }
      } catch (err) {
        console.warn("PDF extraction error, using fallback cleaner:", err);
        const text = await file.text();
        extractedText = cleanRawPdfString(text);
      }
    } else {
      extractedText = await file.text();
    }

    // Sanitize extracted text: remove binary stream noise & control characters
    extractedText = cleanExtractedText(extractedText);

    if (!extractedText || extractedText.trim().length === 0) {
      extractedText = `Document: ${title}\n(No readable text streams could be parsed from file. Summary generated for vault indexing.)`;
    }

    // Auto-generate clean takeaways and summary from actual extracted text!
    const textPreview = extractedText.substring(0, 3500);
    const sentences = extractedText
      .split(/(?<=[.?!])\s+/)
      .map(s => s.trim())
      .filter(s => s.length > 25 && !s.includes("endobj") && !s.includes("stream"));

    const summarySentence = sentences.slice(0, 2).join(" ") || `Extracted document content from ${file.name}.`;
    const takeawaysList = sentences.slice(2, 6).length > 0 
      ? sentences.slice(2, 6).map(s => s.length > 140 ? s.substring(0, 140) + "..." : s)
      : [
          `Extracted ${file.name} completely client-side in browser memory.`,
          `Indexed ${totalPages} page(s) for offline search and RAG synthesis.`,
          `Stored in CRUMB zero-cloud local vault.`
        ];

    const newId = "custom_" + Date.now();
    const newSlice = {
      id: newId,
      title: title,
      category: isPdf ? "PDF Document Vault" : "Text Document Vault",
      icon: isPdf ? "📕" : "📄",
      gradient: isPdf ? "linear-gradient(150deg, #c05a4a, #8f2f24)" : "linear-gradient(150deg, #eda63e, #c9882e)",
      docCount: 1,
      pages: totalPages,
      lastImprinted: "Just now",
      tags: [isPdf ? "PDF" : "TXT", "Custom Upload"],
      content: [
        {
          topic: title,
          summary: summarySentence,
          text: textPreview,
          takeaways: takeawaysList,
          flashcards: [
            {
              front: `Key Subject: ${title}`,
              back: summarySentence.substring(0, 220) || `Document content extracted from ${file.name}`
            },
            {
              front: `Document Excerpt (${title})`,
              back: takeawaysList[0] || `Indexed ${totalPages} page(s) into local library.`
            }
          ],
          quiz: {
            question: `Which statement aligns with the contents of ${title}?`,
            options: [
              takeawaysList[0] || summarySentence.substring(0, 80),
              "This document requires an active cloud connection to query",
              "The file text could not be stored in local browser memory",
              "The document requires server-side authentication"
            ],
            correct: 0,
            explanation: `Derived from the extracted text of ${file.name}.`
          }
        }
      ]
    };

    libraryData.unshift(newSlice);
    activeTrayIds.add(newId);

    renderLibrarySlices();
    updateMemoryTrayUI();
    if (elModal) elModal.classList.remove("active");
    showToast(`Added "${title}" to library`);
    setImprintTopic(newSlice.content[0]);
  }

  // Helper functions to clean raw PDF streams & control characters
  function cleanRawPdfString(str) {
    if (!str) return "";
    let cleaned = str.replace(/stream[\s\S]*?endstream/g, " ");
    cleaned = cleaned.replace(/\d+\s+\d+\s+obj[\s\S]*?endobj/g, " ");
    cleaned = cleaned.replace(/[^\x20-\x7E\t\n\r]/g, " ");
    cleaned = cleaned.replace(/\/[\w\d]+/g, " ");
    cleaned = cleaned.replace(/\s+/g, " ").trim();
    return cleaned;
  }

  function cleanExtractedText(str) {
    if (!str) return "";
    return str
      .replace(/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F-\x9F]/g, "")
      .replace(/\s{3,}/g, "\n\n")
      .trim();
  }

  // ------------------------------------------------------------
  // 10. EMERGENCY MODE TOGGLE
  // ------------------------------------------------------------
  if (elBtnEmergency) {
    elBtnEmergency.addEventListener("click", () => {
      emergencyMode = !emergencyMode;
      elBtnEmergency.classList.toggle("active", emergencyMode);
      if (elViewport) elViewport.classList.toggle("emergency-active", emergencyMode);

      if (emergencyMode) {
        // Activate survival & medicine slices automatically
        activeTrayIds.add("survival");
        activeTrayIds.add("medicine");
        updateMemoryTrayUI();
        renderLibrarySlices();
        showToast("🚨 EMERGENCY KNOWLEDGE MODE ACTIVATED! First Aid & Survival loaded.");
      } else {
        showToast("Returned to standard Knowledge Vault mode.");
      }
    });
  }

  // Search Library Listener
  if (elSearchInput) {
    elSearchInput.addEventListener("input", (e) => {
      renderLibrarySlices(e.target.value);
    });
  }

  // ------------------------------------------------------------
  // 11. TOAST NOTIFICATION UTILITY
  // ------------------------------------------------------------
  function showToast(message) {
    let container = document.querySelector(".toast-container");
    if (!container) {
      container = document.createElement("div");
      container.className = "toast-container";
      document.body.appendChild(container);
    }

    const toast = document.createElement("div");
    toast.className = "toast";
    toast.innerHTML = `<span class="toast-icon">✦</span><span>${message}</span>`;
    container.appendChild(toast);

    setTimeout(() => {
      toast.style.opacity = "0";
      toast.style.transform = "translateY(10px)";
      setTimeout(() => toast.remove(), 300);
    }, 3200);
  }

  // ------------------------------------------------------------
  // 12. INITIALIZATION
  // ------------------------------------------------------------
  function initApp() {
    renderLibrarySlices();
    updateMemoryTrayUI();
    updateImprintView();

    // Initial greeting in chat area
    appendChatMessage("assistant", `**CRUMB Knowledge Vault**

Select active knowledge slices in the Memory Tray above to focus your search, or ask a question directly.

*Suggested queries: "Explain Dijkstra's Algorithm" or "How do I purify water in an emergency?"*`, "Offline Vault Ready");
  }

  document.addEventListener("DOMContentLoaded", initApp);
})();
