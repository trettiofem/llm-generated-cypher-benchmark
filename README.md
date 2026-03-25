# LLM Generated Cypher Benchmark

A benchmark consisting of 1200 Cypher queries, generated using 12 different LLM models.

## Prompts

### Initial Prompt

```md
# Role & Task
You are an AI assistant tasked with generating a batch of 20 Cypher queries for a Neo4j database benchmark. Your goal is to simulate the exact output an LLM would produce if a human user asked it natural language questions about a train network.

# The Graph Schema
The database contains the following Node labels: Station, Platform, Train, Depot, Route, Journey, Ticket, Passenger, TravelCard, DailyPassengerLog, TicketSalesSummary, StaffMember, MaintenanceLog, Incident.
Assume standard relationships exist (e.g., (Passenger)-[:PURCHASED]->(Ticket), (Train)-[:STOPS_AT]->(Station), (Incident)-[:AFFECTED]->(Route)). You may invent specific properties (like id, name, timestamp, status), but keep them consistent.
Do NOT create any new nodes, you are only allowed to read, update and delete nodes (i.e. do NOT use the CREATE clause).

# Output Format
Output exactly 20 queries, starting from simple CRUD/matching operations and ending with highly complex analytical queries. Output ONLY a valid JSON array of strings, where each string is a Cypher query. Do not include markdown formatting or conversational text outside the JSON array.
```

### Follow-up

```md
Generate another 40 queries.
```

### Model and Version Validation

```md
What LLM model (exact version) is this?
```

### Fixing Queries

```md
The following query:

<query>

Generated the following error:

<error>

Fix it.
```

## Models used

The following models were used to generate the benchmark:
- Claude Haiku 4.5
- Claude Sonnet 4.6
- DeepSeek V3.2
- GPT-5.3
- Gemini 3 Flash
- Gemini 3.1 Pro
- Grok 4.20
- Qwen3.5-Plus
- Qwen3.5-Flash
- Mistral Large 2.1
- GLM-5
- Llama 4 Scout

## Validation

```bash
cd validation

# Install dependencies
deno install

# Setup Neo4j instance
sudo docker compose up -d

# Run validation tool
deno run validate
```