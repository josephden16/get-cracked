export const PLAN = [
  // ─────────────────────────────────────────────
  // PHASE 1 — FOUNDATIONS (weeks 1–6)
  // ─────────────────────────────────────────────
  {
    phase: "p1",
    phaseLabel: "Phase 1 — Foundations",
    phaseSub: "weeks 1–6",
    weeks: [
      {
        week: "Week 1–2",
        weekSub: "Distributed systems basics",
        days: [
          {
            title: "Consistency vs availability",
            task: "Watch Martin Kleppmann's DDIA intro talk. Sketch CAP tradeoffs for a payment flow.",
            tag: "watch",
            links: [
              {
                label: "DDIA talk – Kleppmann (YouTube)",
                url: "https://www.youtube.com/watch?v=fU9hR3kiOK0",
              },
              {
                label: "CAP theorem explained – Educative",
                url: "https://www.educative.io/blog/what-is-cap-theorem",
              },
              {
                label: "DDIA book (free chapters)",
                url: "https://dataintensive.net/",
              },
            ],
          },
          {
            title: "Timeouts & retries",
            task: "Build a Node.js HTTP client with exponential backoff + jitter. Test against a flaky mock server.",
            tag: "build",
            links: [
              {
                label: "Exponential backoff – Google Cloud",
                url: "https://cloud.google.com/storage/docs/exponential-backoff",
              },
              {
                label: "async-retry npm package",
                url: "https://github.com/vercel/async-retry",
              },
              {
                label: "Retry patterns – AWS Builder's Library",
                url: "https://aws.amazon.com/builders-library/timeouts-retries-and-backoff-with-jitter/",
              },
            ],
          },
          {
            title: "Idempotency deep dive",
            task: "Read Stripe's idempotency docs. Add idempotency keys to your mock payment API.",
            tag: "read",
            links: [
              {
                label: "Stripe idempotency keys docs",
                url: "https://stripe.com/docs/api/idempotent_requests",
              },
              {
                label: "Idempotency in REST APIs – Stripe blog",
                url: "https://stripe.com/blog/idempotency",
              },
              {
                label: "Implementing idempotency – Brandur Leach",
                url: "https://brandur.org/idempotency-keys",
              },
            ],
          },
          {
            title: "Partial failures",
            task: "Watch 'Fallacies of Distributed Computing'. Write a 1-page note on what this means for fintech.",
            tag: "watch",
            links: [
              {
                label: "8 Fallacies of Distributed Computing (talk)",
                url: "https://www.youtube.com/watch?v=5r22epfdawo",
              },
              {
                label: "Fallacies explained – Arnon Rotem-Gal-Oz",
                url: "https://arnon.me/2010/03/fallacies-of-distributed-computing-explained/",
              },
              {
                label: "Handling partial failures – Microsoft patterns",
                url: "https://learn.microsoft.com/en-us/azure/architecture/patterns/retry",
              },
            ],
          },
          {
            title: "Leader election & clocks",
            task: "Build: Simulate clock skew between two Node processes. Observe ordering bugs. Fix with logical timestamps.",
            tag: "build",
            links: [
              {
                label: "Lamport clocks paper (original)",
                url: "https://lamport.azurewebsites.net/pubs/time-clocks.pdf",
              },
              {
                label: "Logical clocks explained (Fly.io blog)",
                url: "https://fly.io/blog/logical-clocks/",
              },
              {
                label: "Leader election with Redis – Redis docs",
                url: "https://redis.io/docs/manual/patterns/distributed-locks/",
              },
            ],
          },
          {
            title: "Eventual consistency",
            task: "Read AWS DynamoDB consistency model. Map how an account balance update flows through eventual consistency.",
            tag: "read",
            links: [
              {
                label: "DynamoDB read consistency – AWS docs",
                url: "https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/HowItWorks.ReadConsistency.html",
              },
              {
                label: "Eventually Consistent – Werner Vogels",
                url: "https://www.allthingsdistributed.com/2008/12/eventually_consistent.html",
              },
              {
                label: "Consistency models – Jepsen.io",
                url: "https://jepsen.io/consistency",
              },
            ],
          },
          {
            title: "Week review",
            task: "Reflect: What would break in a verification flow if a node partitions mid-request? Write it down.",
            tag: "reflect",
            links: [
              {
                label: "Network partitions in practice – Aphyr",
                url: "https://aphyr.com/posts/281-jepsen-on-the-perils-of-network-partitions",
              },
              {
                label: "DDIA ch. 8 – The Trouble with Distributed Systems",
                url: "https://dataintensive.net/",
              },
            ],
          },
        ],
      },
      {
        week: "Week 3–4",
        weekSub: "Observability",
        days: [
          {
            title: "Structured logging",
            task: "Refactor: Add structured JSON logs (pino/winston) to a personal project. Include correlation IDs on every request.",
            tag: "build",
            links: [
              {
                label: "Pino – super fast Node.js logger",
                url: "https://github.com/pinojs/pino",
              },
              {
                label: "Structured logging best practices",
                url: "https://www.loggly.com/use-cases/node-js-logging/",
              },
              {
                label: "Correlation IDs for distributed tracing",
                url: "https://hilton.org.uk/blog/microservices-correlation-id",
              },
            ],
          },
          {
            title: "RED metrics",
            task: "Watch Tom Wilkie's RED method talk. Implement rate/error/duration counters in a Node Express app.",
            tag: "watch",
            links: [
              {
                label: "RED method – Tom Wilkie (KubeCon)",
                url: "https://www.youtube.com/watch?v=zk77VS98Em8",
              },
              {
                label: "prom-client Node.js library",
                url: "https://github.com/siimon/prom-client",
              },
              {
                label: "Monitoring microservices – RED method guide",
                url: "https://grafana.com/blog/2018/08/02/the-red-method-how-to-instrument-your-services/",
              },
            ],
          },
          {
            title: "Distributed tracing",
            task: "Build: Wire OpenTelemetry into a 2-service Node app. Visualize a trace in Jaeger (free local Docker).",
            tag: "build",
            links: [
              {
                label: "OpenTelemetry Node.js getting started",
                url: "https://opentelemetry.io/docs/instrumentation/js/getting-started/nodejs/",
              },
              {
                label: "Jaeger tracing – quick start Docker",
                url: "https://www.jaegertracing.io/docs/1.41/getting-started/",
              },
              {
                label: "Distributed tracing – The New Stack",
                url: "https://thenewstack.io/distributed-tracing-with-opentelemetry/",
              },
            ],
          },
          {
            title: "Sampling strategies",
            task: "Read Honeycomb's sampling guide. Decide what sampling rate makes sense for a payment processing service.",
            tag: "read",
            links: [
              {
                label: "Sampling in observability – Honeycomb",
                url: "https://docs.honeycomb.io/manage-data-volume/sampling/",
              },
              {
                label: "Trace sampling strategies – OpenTelemetry",
                url: "https://opentelemetry.io/docs/concepts/sampling/",
              },
              {
                label: "Head vs tail sampling explained",
                url: "https://www.honeycomb.io/blog/head-vs-tail-based-sampling/",
              },
            ],
          },
          {
            title: "Debug 'slow sometimes'",
            task: "Build: Artificially inject p99 latency into one route. Practice finding it using only logs + traces.",
            tag: "build",
            links: [
              {
                label: "Debugging latency with distributed tracing – Jaeger",
                url: "https://www.jaegertracing.io/docs/1.41/architecture/",
              },
              {
                label: "Artillery.io – load testing for Node",
                url: "https://www.artillery.io/docs",
              },
              {
                label: "Latency injection patterns – Netflix TechBlog",
                url: "https://netflixtechblog.com/fit-failure-injection-testing-35d8e2a9bb2",
              },
            ],
          },
          {
            title: "Alerting that doesn't spam",
            task: "Read Google SRE book ch. 6 (free online). Draft 3 alert rules for a payment checkout flow.",
            tag: "read",
            links: [
              {
                label: "Google SRE Book ch. 6 – Monitoring (free)",
                url: "https://sre.google/sre-book/monitoring-distributed-systems/",
              },
              {
                label: "Alerting on what matters – Prometheus docs",
                url: "https://prometheus.io/docs/practices/alerting/",
              },
              {
                label: "On-call best practices – PagerDuty",
                url: "https://www.pagerduty.com/resources/learn/on-call-management/",
              },
            ],
          },
          {
            title: "Week review",
            task: "Reflect: What 3 things would you instrument first if you joined a new fintech codebase tomorrow?",
            tag: "reflect",
            links: [
              {
                label: "Observability engineering – O'Reilly sample",
                url: "https://www.oreilly.com/library/view/observability-engineering/9781492076438/",
              },
              {
                label: "What is observability? – Honeycomb",
                url: "https://www.honeycomb.io/what-is-observability/",
              },
            ],
          },
        ],
      },
      {
        week: "Week 5–6",
        weekSub: "Caching with correctness",
        days: [
          {
            title: "Cache invalidation strategies",
            task: "Watch Redis University RU101 (free). Build a read-through cache for a product lookup in Node + Redis.",
            tag: "watch",
            links: [
              {
                label: "Redis University RU101 (free course)",
                url: "https://university.redis.com/courses/ru101/",
              },
              {
                label: "Caching strategies – AWS docs",
                url: "https://docs.aws.amazon.com/whitepapers/latest/database-caching-strategies-using-redis/caching-patterns.html",
              },
              {
                label: "ioredis – Node.js Redis client",
                url: "https://github.com/luin/ioredis",
              },
            ],
          },
          {
            title: "Write-through & TTLs",
            task: "Build: Implement write-through cache on a balance read endpoint. Test stale read scenarios.",
            tag: "build",
            links: [
              {
                label: "Write-through vs write-back caching",
                url: "https://docs.aws.amazon.com/whitepapers/latest/database-caching-strategies-using-redis/caching-patterns.html",
              },
              {
                label: "TTL design for financial data – Redis blog",
                url: "https://redis.com/blog/handling-redis-cache-stampede/",
              },
              {
                label: "Testing cache stale reads with Jest + fakeredis",
                url: "https://github.com/stipsan/ioredis-mock",
              },
            ],
          },
          {
            title: "Cache stampede",
            task: "Build: Simulate a thundering herd on cold cache. Implement probabilistic early expiration fix.",
            tag: "build",
            links: [
              {
                label: "Cache stampede problem – Wikipedia",
                url: "https://en.wikipedia.org/wiki/Cache_stampede",
              },
              {
                label: "Probabilistic early expiration – Redis blog",
                url: "https://redis.com/blog/handling-redis-cache-stampede/",
              },
              {
                label: "Thundering herd mitigation – Cloudflare blog",
                url: "https://blog.cloudflare.com/thundering-herd-problem-at-scale/",
              },
            ],
          },
          {
            title: "Negative caching",
            task: "Read Cloudflare's negative caching post. Add negative cache for 'user not found' in a Node API.",
            tag: "read",
            links: [
              {
                label: "Negative caching – Cloudflare blog",
                url: "https://blog.cloudflare.com/negative-cache-why-doesnt-my-change-show-up/",
              },
              {
                label: "Negative TTL in DNS – RFC 2308",
                url: "https://www.rfc-editor.org/rfc/rfc2308",
              },
              {
                label: "Cache aside pattern – Microsoft",
                url: "https://learn.microsoft.com/en-us/azure/architecture/patterns/cache-aside",
              },
            ],
          },
          {
            title: "When caching hides bugs",
            task: "Build: Introduce a cache coherency bug (stale account balance). Document how you'd detect it in prod.",
            tag: "build",
            links: [
              {
                label: "Cache coherence – Distributed Systems lecture",
                url: "https://www.youtube.com/watch?v=LfiFi0GXKNI",
              },
              {
                label: "Stale reads in financial systems – Fauna blog",
                url: "https://fauna.com/blog/consistency-vs-availability",
              },
              {
                label: "Data inconsistency patterns – Martin Fowler",
                url: "https://martinfowler.com/articles/patterns-of-distributed-systems/",
              },
            ],
          },
          {
            title: "Payments-specific caching",
            task: "Read how Stripe caches card fingerprints + fraud signals. Design a cache layer for a mock fraud scoring service.",
            tag: "read",
            links: [
              {
                label: "Stripe engineering blog – caching patterns",
                url: "https://stripe.com/blog/engineering",
              },
              {
                label: "Fraud scoring architecture – Stripe Sessions",
                url: "https://www.youtube.com/results?search_query=stripe+fraud+scoring+architecture",
              },
              {
                label: "Redis for real-time fraud detection",
                url: "https://redis.com/solutions/use-cases/fraud-detection/",
              },
            ],
          },
          {
            title: "Week review",
            task: "Reflect: What's the most dangerous cache you could build in a payments system and why?",
            tag: "reflect",
            links: [
              {
                label: "Caching anti-patterns – AWS re:Invent",
                url: "https://www.youtube.com/results?search_query=caching+anti-patterns+payments+AWS",
              },
              {
                label: "DDIA ch. 5 – Replication (free preview)",
                url: "https://dataintensive.net/",
              },
            ],
          },
        ],
      },
    ],
  },

  // ─────────────────────────────────────────────
  // PHASE 2 — SENIOR BRIDGE (weeks 7–12)  ← NEW
  // Closes the mid→senior gap before going deep
  // ─────────────────────────────────────────────
  {
    phase: "p2",
    phaseLabel: "Phase 2 — Senior Bridge",
    phaseSub: "weeks 7–12",
    weeks: [
      {
        week: "Week 7–8",
        weekSub: "Data modeling & storage depth",
        days: [
          {
            title: "Isolation levels & anomalies",
            task: "Read DDIA ch. 7 (Transactions). Set up two Postgres sessions and reproduce a dirty read, non-repeatable read, and phantom read. Fix each with the correct isolation level.",
            tag: "build",
            links: [
              {
                label: "Postgres transaction isolation – official docs",
                url: "https://www.postgresql.org/docs/current/transaction-iso.html",
              },
              {
                label: "DDIA ch. 7 – Transactions (free preview)",
                url: "https://dataintensive.net/",
              },
              {
                label: "Isolation levels explained – Fauna blog",
                url: "https://fauna.com/blog/introduction-to-transaction-isolation-levels",
              },
            ],
          },
          {
            title: "Query plans & indexes",
            task: "Run EXPLAIN ANALYZE on 3 slow queries in a personal Postgres DB. Add missing indexes. Measure the before/after difference.",
            tag: "build",
            links: [
              {
                label: "EXPLAIN ANALYZE – Postgres docs",
                url: "https://www.postgresql.org/docs/current/sql-explain.html",
              },
              {
                label: "Index types in Postgres – pganalyze guide",
                url: "https://pganalyze.com/blog/5mins-postgres-index-types",
              },
              {
                label: "Use the index, Luke – SQL indexing guide",
                url: "https://use-the-index-luke.com/",
              },
            ],
          },
          {
            title: "Locks & deadlocks",
            task: "Reproduce a deadlock in Postgres between two concurrent payment update transactions. Fix it using consistent lock ordering.",
            tag: "build",
            links: [
              {
                label: "Postgres locking – official docs",
                url: "https://www.postgresql.org/docs/current/explicit-locking.html",
              },
              {
                label: "Deadlocks in Postgres – Brandur Leach",
                url: "https://brandur.org/postgres-deadlocks",
              },
              {
                label: "SELECT FOR UPDATE patterns – pganalyze",
                url: "https://pganalyze.com/blog/5mins-postgres-select-for-update",
              },
            ],
          },
          {
            title: "Safe migrations at scale",
            task: "Read Stripe's zero-downtime migration post. Write a migration plan for adding a non-null column to a 10M-row payments table without locking it.",
            tag: "read",
            links: [
              {
                label: "Zero-downtime migrations – Stripe blog",
                url: "https://stripe.com/blog/online-migrations",
              },
              {
                label:
                  "Safe Postgres migrations – Strong Migrations gem (concepts apply)",
                url: "https://github.com/ankane/strong_migrations",
              },
              {
                label: "Online schema changes – GitHub engineering",
                url: "https://github.blog/engineering/engineering-principles/gh-ost-github-s-online-schema-migrations-for-mysql/",
              },
            ],
          },
          {
            title: "Relational modeling for fintech",
            task: "Model a multi-currency wallet: accounts, balances, transactions, exchange rates. Write the DDL. Enforce constraints at the DB layer, not just application layer.",
            tag: "build",
            links: [
              {
                label: "Accounting for Developers – Modern Treasury",
                url: "https://www.moderntreasury.com/journal/accounting-for-developers-part-i",
              },
              {
                label: "Database constraints – Postgres docs",
                url: "https://www.postgresql.org/docs/current/ddl-constraints.html",
              },
              {
                label: "Multi-currency data modeling – Shopify engineering",
                url: "https://shopify.engineering/engineering-principles",
              },
            ],
          },
          {
            title: "Partitioning & archiving",
            task: "Add range partitioning to a transactions table by month in Postgres. Test query performance with and without partition pruning.",
            tag: "build",
            links: [
              {
                label: "Table partitioning – Postgres docs",
                url: "https://www.postgresql.org/docs/current/ddl-partitioning.html",
              },
              {
                label: "Partitioning for time-series data – Timescale blog",
                url: "https://www.timescale.com/blog/scaling-partitioning-data-postgresql-10-explained/",
              },
              {
                label: "When to partition – pganalyze",
                url: "https://pganalyze.com/blog/5mins-postgres-table-partitioning",
              },
            ],
          },
          {
            title: "Week review",
            task: "Reflect: Look at the MySkoolFees or Clisha Review schema. What would break first at 100× data volume? What would you change?",
            tag: "reflect",
            links: [
              {
                label: "Database schema design pitfalls – Postgres wiki",
                url: "https://wiki.postgresql.org/wiki/Don%27t_Do_This",
              },
              {
                label: "DDIA ch. 3 – Storage and Retrieval",
                url: "https://dataintensive.net/",
              },
            ],
          },
        ],
      },
      {
        week: "Week 9–10",
        weekSub: "API design & contracts",
        days: [
          {
            title: "Versioning strategies",
            task: "Read Stripe's API versioning post. Implement URL versioning (/v1, /v2) and header-based versioning in a NestJS app. Write a migration guide between versions.",
            tag: "read",
            links: [
              {
                label: "Stripe API versioning strategy – Stripe blog",
                url: "https://stripe.com/blog/api-versioning",
              },
              {
                label: "API versioning patterns – Phil Sturgeon",
                url: "https://apisyouwonthate.com/blog/api-versioning-has-no-right-way",
              },
              {
                label: "NestJS versioning – official docs",
                url: "https://docs.nestjs.com/techniques/versioning",
              },
            ],
          },
          {
            title: "Pagination & filtering",
            task: "Build: Implement cursor-based pagination on a transactions endpoint (keyset pagination). Compare with offset pagination — show why offset breaks at scale.",
            tag: "build",
            links: [
              {
                label: "Cursor-based pagination – Slack engineering",
                url: "https://slack.engineering/evolving-api-pagination-at-slack/",
              },
              {
                label: "Keyset vs offset pagination – Use The Index Luke",
                url: "https://use-the-index-luke.com/no-offset",
              },
              {
                label: "Pagination patterns – Stripe API docs",
                url: "https://stripe.com/docs/api/pagination",
              },
            ],
          },
          {
            title: "Error models & problem details",
            task: "Read RFC 7807 (Problem Details for HTTP APIs). Standardise error responses across a NestJS app — machine-readable codes, human messages, debug context in dev only.",
            tag: "read",
            links: [
              {
                label: "RFC 7807 – Problem Details for HTTP APIs",
                url: "https://www.rfc-editor.org/rfc/rfc7807",
              },
              {
                label: "Error handling in NestJS – official docs",
                url: "https://docs.nestjs.com/exception-filters",
              },
              {
                label: "API error design – Thoughtworks radar",
                url: "https://www.thoughtworks.com/radar/techniques/problems-details-for-http-apis",
              },
            ],
          },
          {
            title: "Rate limiting patterns",
            task: "Build: Implement token bucket rate limiting in NestJS + Redis. Add per-user and per-IP limits. Return correct 429 headers (Retry-After, X-RateLimit-*).",
            tag: "build",
            links: [
              {
                label: "Rate limiting algorithms – Cloudflare blog",
                url: "https://blog.cloudflare.com/counting-things-a-lot-of-different-things/",
              },
              {
                label: "nestjs-rate-limiter – npm",
                url: "https://github.com/ozkanonur/nestjs-rate-limiter",
              },
              {
                label: "Redis rate limiting patterns – Redis docs",
                url: "https://redis.io/docs/manual/patterns/distributed-locks/",
              },
            ],
          },
          {
            title: "Backwards compatibility",
            task: "Watch 'API design for longevity' (Stripe Sessions). Add a new required field to a live endpoint without breaking existing clients — use the expand your contract, never restrict approach.",
            tag: "watch",
            links: [
              {
                label: "API design for longevity – Stripe Sessions (YouTube)",
                url: "https://www.youtube.com/results?search_query=stripe+sessions+api+design+longevity",
              },
              {
                label: "Tolerant reader pattern – Martin Fowler",
                url: "https://martinfowler.com/bliki/TolerantReader.html",
              },
              {
                label: "Robustness principle (Postel's Law) – Wikipedia",
                url: "https://en.wikipedia.org/wiki/Robustness_principle",
              },
            ],
          },
          {
            title: "OpenAPI & contract testing",
            task: "Generate an OpenAPI spec from your NestJS app. Write a Pact consumer contract test for one endpoint. Verify it catches a breaking change.",
            tag: "build",
            links: [
              {
                label: "NestJS Swagger / OpenAPI – official docs",
                url: "https://docs.nestjs.com/openapi/introduction",
              },
              {
                label: "Pact contract testing – getting started",
                url: "https://docs.pact.io/getting_started/how_pact_works",
              },
              {
                label: "Consumer-driven contracts – Martin Fowler",
                url: "https://martinfowler.com/articles/consumerDrivenContracts.html",
              },
            ],
          },
          {
            title: "Week review",
            task: "Reflect: Audit the deepidv MCP API surface. Which endpoints could silently break a client on the next deploy? Write down the risk and a fix.",
            tag: "reflect",
            links: [
              {
                label: "API design patterns book – Google Cloud",
                url: "https://cloud.google.com/apis/design",
              },
              {
                label: "Breaking vs non-breaking changes – Swagger blog",
                url: "https://swagger.io/blog/api-strategy/what-is-api-versioning/",
              },
            ],
          },
        ],
      },
      {
        week: "Week 11",
        weekSub: "Messaging & async systems",
        days: [
          {
            title: "Kafka semantics & guarantees",
            task: "Watch Confluent's 'Kafka in 1 hour' talk. Map at-least-once vs at-most-once vs exactly-once to real payment scenarios. Understand why 'exactly-once' needs idempotent consumers.",
            tag: "watch",
            links: [
              {
                label: "Kafka in 1 hour – Confluent (YouTube)",
                url: "https://www.youtube.com/watch?v=Ch5VhJzaoaI",
              },
              {
                label: "Exactly-once semantics – Confluent blog",
                url: "https://www.confluent.io/blog/exactly-once-semantics-are-possible-heres-how-apache-kafka-does-it/",
              },
              {
                label: "Kafka vs RabbitMQ – CloudAMQP blog",
                url: "https://www.cloudamqp.com/blog/part1-rabbitmq-best-practice.html",
              },
            ],
          },
          {
            title: "Consumer groups & ordering",
            task: "Build: Run a local Kafka (Docker). Produce 100 payment events. Consume with 2 consumer group instances. Observe partition-level ordering guarantees and what breaks them.",
            tag: "build",
            links: [
              {
                label: "Kafka consumer groups – official docs",
                url: "https://kafka.apache.org/documentation/#intro_consumers",
              },
              {
                label: "Kafka Docker quickstart – Confluent",
                url: "https://developer.confluent.io/quickstart/kafka-docker/",
              },
              {
                label: "Message ordering guarantees – AWS blog",
                url: "https://aws.amazon.com/blogs/compute/new-for-aws-lambda-sqs-fifo-as-an-event-source/",
              },
            ],
          },
          {
            title: "Dead-letter queues & retries",
            task: "Build: Add a DLQ to an existing BullMQ job queue (you've used this in prod). Configure retry backoff + poison message handling. Write the operator runbook for when the DLQ fills up.",
            tag: "build",
            links: [
              {
                label: "BullMQ failed jobs & DLQ – official docs",
                url: "https://docs.bullmq.io/guide/retrying-failing-jobs",
              },
              {
                label: "Dead letter queues – AWS SQS docs",
                url: "https://docs.aws.amazon.com/AWSSimpleQueueService/latest/SQSDeveloperGuide/sqs-dead-letter-queues.html",
              },
              {
                label: "Poison messages in distributed systems – Microsoft",
                url: "https://learn.microsoft.com/en-us/azure/service-bus-messaging/service-bus-dead-letter-queues",
              },
            ],
          },
          {
            title: "Deduplication & replay",
            task: "Build: Implement consumer-side deduplication using a Redis SET of processed message IDs. Test replay: reprocess the last hour of payment events safely.",
            tag: "build",
            links: [
              {
                label: "Idempotent consumers – Confluent blog",
                url: "https://www.confluent.io/blog/exactly-once-semantics-are-possible-heres-how-apache-kafka-does-it/",
              },
              {
                label: "Message deduplication – AWS SQS FIFO",
                url: "https://docs.aws.amazon.com/AWSSimpleQueueService/latest/SQSDeveloperGuide/using-messagededuplicationid-property.html",
              },
              {
                label: "Event replay patterns – Martin Fowler",
                url: "https://martinfowler.com/eaaDev/EventSourcing.html",
              },
            ],
          },
          {
            title: "Week review",
            task: "Reflect: In the Clisha Review or MySkoolFees stack, where would introducing an async queue reduce coupling? Where would it introduce risk? Write a 1-page trade-off note.",
            tag: "reflect",
            links: [
              {
                label: "Messaging patterns – Enterprise Integration Patterns",
                url: "https://www.enterpriseintegrationpatterns.com/patterns/messaging/",
              },
              {
                label: "Async vs sync microservices – NGINX blog",
                url: "https://www.nginx.com/blog/event-driven-data-management-microservices/",
              },
            ],
          },
        ],
      },
      {
        week: "Week 12",
        weekSub: "Reliability engineering",
        days: [
          {
            title: "SLOs & SLIs",
            task: "Read Google SRE workbook ch. 2 (free). Define SLOs for a payment checkout flow: availability, latency, error rate. Write the SLI queries in pseudo-Prometheus.",
            tag: "read",
            links: [
              {
                label: "SRE workbook ch. 2 – SLOs (free)",
                url: "https://sre.google/workbook/implementing-slos/",
              },
              {
                label: "SLO generator – Google",
                url: "https://github.com/google/slo-generator",
              },
              {
                label: "SLOs in practice – Atlassian blog",
                url: "https://www.atlassian.com/incident-management/kpis/sla-vs-slo-vs-sli",
              },
            ],
          },
          {
            title: "Circuit breakers",
            task: "Build: Implement a circuit breaker around an external payment provider call in Node.js using opossum. Simulate provider failures. Observe open → half-open → closed transitions.",
            tag: "build",
            links: [
              {
                label: "opossum – Node.js circuit breaker library",
                url: "https://nodeshift.dev/opossum/",
              },
              {
                label: "Circuit breaker pattern – Martin Fowler",
                url: "https://martinfowler.com/bliki/CircuitBreaker.html",
              },
              {
                label: "Resilience patterns – Microsoft Azure",
                url: "https://learn.microsoft.com/en-us/azure/architecture/patterns/circuit-breaker",
              },
            ],
          },
          {
            title: "Feature flags & graceful degradation",
            task: "Build: Add feature flags to a Node API using a simple Redis-backed flag store (or Unleash locally). Use a flag to disable a non-critical feature under load. Test the degraded path.",
            tag: "build",
            links: [
              {
                label: "Unleash – open source feature flags",
                url: "https://docs.getunleash.io/",
              },
              {
                label: "Feature flags – Martin Fowler",
                url: "https://martinfowler.com/articles/feature-toggles.html",
              },
              {
                label: "Graceful degradation patterns – AWS blog",
                url: "https://aws.amazon.com/builders-library/avoiding-fallback-in-distributed-systems/",
              },
            ],
          },
          {
            title: "Error budgets & postmortems",
            task: "Read a real postmortem (Cloudflare or Stripe). Write a blameless postmortem for a real incident you've encountered (could be the ERPNext data loss incident). Use the 5-whys format.",
            tag: "read",
            links: [
              {
                label: "Cloudflare public postmortems",
                url: "https://blog.cloudflare.com/tag/outage/",
              },
              {
                label: "Blameless postmortem guide – Google SRE",
                url: "https://sre.google/sre-book/postmortem-culture/",
              },
              {
                label: "Postmortem template – PagerDuty",
                url: "https://postmortems.pagerduty.com/",
              },
            ],
          },
          {
            title: "Week review",
            task: "Reflect: Define a realistic error budget for the deepidv verification service. What consumes it fastest? What's the first thing you'd fix?",
            tag: "reflect",
            links: [
              {
                label: "Error budgets in practice – SRE workbook",
                url: "https://sre.google/workbook/error-budget-policy/",
              },
              {
                label: "Reliability engineering for startups – Increment",
                url: "https://increment.com/reliability/",
              },
            ],
          },
        ],
      },
    ],
  },

  // ─────────────────────────────────────────────
  // PHASE 3 — SYSTEMS DEPTH (weeks 13–17)
  // Previously Phase 2 — numbering shifted
  // ─────────────────────────────────────────────
  {
    phase: "p3",
    phaseLabel: "Phase 3 — Systems Depth",
    phaseSub: "weeks 13–17",
    weeks: [
      {
        week: "Week 13–14",
        weekSub: "Performance & capacity",
        days: [
          {
            title: "Latency budgets (p50/p95/p99)",
            task: "Watch 'Latency Numbers Every Engineer Should Know' talk. Set p99 budgets for a checkout flow.",
            tag: "watch",
            links: [
              {
                label: "Latency numbers every engineer should know",
                url: "https://gist.github.com/jboner/2841832",
              },
              {
                label: "Understanding latency percentiles – Prometheus blog",
                url: "https://prometheus.io/docs/practices/histograms/",
              },
              {
                label: "Setting SLOs for latency – Google SRE workbook",
                url: "https://sre.google/workbook/implementing-slos/",
              },
            ],
          },
          {
            title: "Load testing basics",
            task: "Build: Write k6 load test for a Node API. Push until it breaks. Identify the bottleneck (CPU vs IO).",
            tag: "build",
            links: [
              {
                label: "k6 load testing – getting started",
                url: "https://k6.io/docs/getting-started/running-k6/",
              },
              {
                label: "Node.js performance bottlenecks – clinic.js",
                url: "https://clinicjs.org/",
              },
              {
                label: "Load testing strategies – k6 blog",
                url: "https://k6.io/blog/load-testing-best-practices/",
              },
            ],
          },
          {
            title: "Connection pools",
            task: "Build: Tune pg connection pool size in Node. Observe queue buildup under load. Find optimal pool size.",
            tag: "build",
            links: [
              {
                label: "pg-pool docs – node-postgres",
                url: "https://node-postgres.com/features/pooling",
              },
              {
                label: "Postgres connection pooling – Supabase blog",
                url: "https://supabase.com/blog/supabase-pgbouncer",
              },
              {
                label: "Connection pool sizing guide – PgBouncer docs",
                url: "https://www.pgbouncer.org/config.html",
              },
            ],
          },
          {
            title: "Queueing theory intuition",
            task: "Read 'The Art of Capacity Planning' ch. 1–2. Apply Little's Law to estimate throughput of a payment processor.",
            tag: "read",
            links: [
              {
                label: "Little's Law explained with examples",
                url: "https://www.youtube.com/watch?v=Yxbw-GGQYxA",
              },
              {
                label: "Queueing theory for engineers – Baron Schwartz",
                url: "https://www.percona.com/blog/queueing-theory-basics-resource-utilization-vs-wait-time/",
              },
              {
                label: "USE method – Brendan Gregg",
                url: "https://www.brendangregg.com/usemethod.html",
              },
            ],
          },
          {
            title: "Tail latency causes",
            task: "Watch 'Tail at Scale' (Google paper summary on YouTube). Reproduce a tail latency scenario with a slow Redis call.",
            tag: "watch",
            links: [
              {
                label: "The Tail at Scale – Google paper (ACM)",
                url: "https://research.google/pubs/pub40801/",
              },
              {
                label: "Tail latency explained – Hacker News discussion",
                url: "https://news.ycombinator.com/item?id=14471187",
              },
              {
                label: "Hedged requests pattern – Google SRE",
                url: "https://sre.google/sre-book/addressing-cascading-failures/",
              },
            ],
          },
          {
            title: "Capacity planning with real numbers",
            task: "Build: Estimate infra cost for 1M payments/day. Spreadsheet: RPS, DB connections, cache hit rate, instance count.",
            tag: "build",
            links: [
              {
                label: "AWS pricing calculator",
                url: "https://calculator.aws/pricing/2/home",
              },
              {
                label: "Capacity planning for SaaS – AWS blog",
                url: "https://aws.amazon.com/blogs/architecture/capacity-planning-for-aws/",
              },
              {
                label: "Back-of-napkin estimation – system design primer",
                url: "https://github.com/donnemartin/system-design-primer#back-of-envelope-calculations",
              },
            ],
          },
          {
            title: "Week review",
            task: "Reflect: If your service gets 10× traffic tomorrow, what breaks first? Write the answer before looking anything up.",
            tag: "reflect",
            links: [
              {
                label: "System design capacity estimation – ByteByteGo",
                url: "https://blog.bytebytego.com/p/back-of-envelope-estimation",
              },
              {
                label: "Scalability cheat sheet – High Scalability",
                url: "http://highscalability.com/blog/2011/1/26/google-pro-tip-use-back-of-the-envelope-calculations-to-choo.html",
              },
            ],
          },
        ],
      },
      {
        week: "Week 15",
        weekSub: "Security fundamentals",
        days: [
          {
            title: "AuthN vs AuthZ",
            task: "Build: Implement RBAC on a Node API. Roles: viewer, operator, admin. Test boundary cases.",
            tag: "build",
            links: [
              {
                label: "RBAC in Node.js – Auth0 guide",
                url: "https://auth0.com/docs/manage-users/access-control/rbac",
              },
              {
                label: "casbin – access control library for Node",
                url: "https://casbin.org/docs/get-started",
              },
              {
                label: "OWASP – Broken Access Control (A01)",
                url: "https://owasp.org/Top10/A01_2021-Broken_Access_Control/",
              },
            ],
          },
          {
            title: "Secrets management",
            task: "Build: Migrate hardcoded env vars to AWS Secrets Manager or Doppler. Add rotation plan.",
            tag: "build",
            links: [
              {
                label: "AWS Secrets Manager – Node.js SDK",
                url: "https://docs.aws.amazon.com/secretsmanager/latest/userguide/retrieving-secrets_cache-ref_nodejs.html",
              },
              {
                label: "Doppler – secrets manager for Node",
                url: "https://docs.doppler.com/docs/node-js",
              },
              {
                label: "Secrets rotation best practices – AWS",
                url: "https://docs.aws.amazon.com/secretsmanager/latest/userguide/rotating-secrets.html",
              },
            ],
          },
          {
            title: "OWASP top 10 for fintech",
            task: "Read OWASP's top 10 list. Map each to a real fintech attack vector.",
            tag: "read",
            links: [
              {
                label: "OWASP Top 10 – 2021 edition",
                url: "https://owasp.org/www-project-top-ten/",
              },
              {
                label: "OWASP fintech security guide",
                url: "https://owasp.org/www-project-mobile-top-10/",
              },
              {
                label: "SQL injection in KYC forms – OWASP",
                url: "https://owasp.org/www-community/attacks/SQL_Injection",
              },
            ],
          },
          {
            title: "Token expiry & SSRF",
            task: "Watch PortSwigger's SSRF lab (free). Add SSRF mitigations to a service that fetches external URLs.",
            tag: "watch",
            links: [
              {
                label: "SSRF – PortSwigger Web Security Academy (free)",
                url: "https://portswigger.net/web-security/ssrf",
              },
              {
                label: "SSRF prevention – OWASP cheat sheet",
                url: "https://cheatsheetseries.owasp.org/cheatsheets/Server_Side_Request_Forgery_Prevention_Cheat_Sheet.html",
              },
              {
                label: "JWT best practices – Auth0",
                url: "https://auth0.com/blog/a-look-at-the-latest-draft-for-jwt-bcp/",
              },
            ],
          },
          {
            title: "Audit logs",
            task: "Build: Add immutable audit log to a payment mutation endpoint. Every state change logged with actor + timestamp.",
            tag: "build",
            links: [
              {
                label: "Audit logging patterns – Martin Fowler",
                url: "https://martinfowler.com/eaaDev/AuditLog.html",
              },
              {
                label: "Append-only logs in Postgres",
                url: "https://brandur.org/append-only-log",
              },
              {
                label: "Event sourcing for audit trails – AWS blog",
                url: "https://aws.amazon.com/blogs/database/build-an-audit-trail-with-event-sourcing/",
              },
            ],
          },
        ],
      },
      {
        week: "Week 16–17",
        weekSub: "Infra literacy (Linux, containers, k8s)",
        days: [
          {
            title: "Linux process model",
            task: "Watch 'Linux processes, threads, and how they relate to containers' (Ivan Velichko). Run strace on a Node process.",
            tag: "watch",
            links: [
              {
                label: "Linux containers from scratch – Ivan Velichko",
                url: "https://iximiuz.com/en/posts/container-learning-path/",
              },
              {
                label: "strace tutorial – Julia Evans",
                url: "https://jvns.ca/strace-zine/",
              },
              {
                label: "Linux process model – Red Hat guide",
                url: "https://www.redhat.com/en/topics/linux/what-is-linux",
              },
            ],
          },
          {
            title: "Networking: DNS + TCP + TLS",
            task: "Trace a full HTTP request from DNS lookup to TLS handshake using curl -v and Wireshark.",
            tag: "build",
            links: [
              {
                label: "How DNS works – Julia Evans comic",
                url: "https://jvns.ca/blog/2022/04/26/new-zine--how-dns-works/",
              },
              {
                label: "TLS handshake explained – Cloudflare",
                url: "https://www.cloudflare.com/learning/ssl/what-happens-in-a-tls-handshake/",
              },
              {
                label: "curl verbose output guide",
                url: "https://curl.se/docs/manpage.html",
              },
            ],
          },
          {
            title: "Docker fundamentals",
            task: "Dockerize a Node API from scratch. Multi-stage build. Non-root user. Layer caching optimized.",
            tag: "build",
            links: [
              {
                label: "Dockerfile best practices – Docker docs",
                url: "https://docs.docker.com/develop/develop-images/dockerfile_best-practices/",
              },
              {
                label: "Multi-stage builds – Docker",
                url: "https://docs.docker.com/build/building/multi-stage/",
              },
              {
                label: "Node.js Docker best practices – snyk",
                url: "https://snyk.io/blog/10-best-practices-to-containerize-nodejs-web-applications-with-docker/",
              },
            ],
          },
          {
            title: "Kubernetes concepts",
            task: "Watch TechWorld with Nana k8s beginner series (2 episodes). Deploy your Docker image to a local minikube.",
            tag: "watch",
            links: [
              {
                label: "Kubernetes tutorial – TechWorld with Nana (YouTube)",
                url: "https://www.youtube.com/watch?v=X48VuDVv0do",
              },
              {
                label: "minikube getting started",
                url: "https://minikube.sigs.k8s.io/docs/start/",
              },
              {
                label: "Kubernetes concepts – official docs",
                url: "https://kubernetes.io/docs/concepts/",
              },
            ],
          },
          {
            title: "Autoscaling & deployment strategies",
            task: "Read AWS ECS blue/green deployment docs. Add canary rollout plan to a service.",
            tag: "read",
            links: [
              {
                label: "ECS blue/green deployments – AWS docs",
                url: "https://docs.aws.amazon.com/AmazonECS/latest/developerguide/deployment-type-bluegreen.html",
              },
              {
                label: "Canary deployments – Kubernetes patterns",
                url: "https://kubernetes.io/docs/concepts/workloads/controllers/deployment/#canary-deployment",
              },
              {
                label: "Progressive delivery – Argo Rollouts",
                url: "https://argo-rollouts.readthedocs.io/en/stable/",
              },
            ],
          },
          {
            title: "Cloud bill literacy",
            task: "Build: Estimate monthly AWS cost for a payments service: ECS Fargate + RDS + ElastiCache. Know what each line pays for.",
            tag: "build",
            links: [
              {
                label: "AWS Cost Explorer guide",
                url: "https://docs.aws.amazon.com/cost-management/latest/userguide/ce-what-is.html",
              },
              {
                label: "Fargate pricing guide",
                url: "https://aws.amazon.com/fargate/pricing/",
              },
              {
                label: "Cloud cost optimization – AWS Well-Architected",
                url: "https://aws.amazon.com/architecture/well-architected/",
              },
            ],
          },
          {
            title: "Week review",
            task: "Reflect: Draw the infra diagram of a Node.js service from memory. What would you change for production?",
            tag: "reflect",
            links: [
              {
                label: "Production Node.js infra – Twelve Factor App",
                url: "https://12factor.net/",
              },
              {
                label: "AWS well-architected framework",
                url: "https://aws.amazon.com/architecture/well-architected/",
              },
            ],
          },
        ],
      },
    ],
  },

  // ─────────────────────────────────────────────
  // PHASE 4 — STAFF-LEVEL SKILLS (weeks 18–21)
  // Previously Phase 3 — numbering shifted
  // ─────────────────────────────────────────────
  {
    phase: "p4",
    phaseLabel: "Phase 4 — Staff-Level Skills",
    phaseSub: "weeks 18–21",
    weeks: [
      {
        week: "Week 18",
        weekSub: "Payments domain depth",
        days: [
          {
            title: "Payment rails overview",
            task: "Read Stripe's payment fundamentals docs + Modern Treasury blog. Map Visa/Mastercard flow end-to-end.",
            tag: "read",
            links: [
              {
                label: "Stripe payment fundamentals – docs",
                url: "https://stripe.com/docs/payments/payment-intents",
              },
              {
                label: "How credit card networks work – Modern Treasury",
                url: "https://www.moderntreasury.com/learn/the-payment-landscape",
              },
              {
                label: "Payment rails explained – Fintech Nexus",
                url: "https://fintechnexus.com/understanding-payment-rails/",
              },
            ],
          },
          {
            title: "Idempotency in fintech",
            task: "Build: Implement a full idempotent charge endpoint: idempotency key storage, replay detection, TTL.",
            tag: "build",
            links: [
              {
                label: "Idempotency keys in payments – Brandur Leach",
                url: "https://brandur.org/idempotency-keys",
              },
              {
                label: "Stripe idempotency implementation",
                url: "https://stripe.com/blog/idempotency",
              },
              {
                label: "Implementing idempotent APIs in Node.js",
                url: "https://www.nearform.com/blog/implementing-idempotent-apis-in-node-js/",
              },
            ],
          },
          {
            title: "Ledgering & double-entry",
            task: "Read 'Accounting for Developers' (Modern Treasury blog). Build a minimal double-entry ledger in Postgres.",
            tag: "build",
            links: [
              {
                label: "Accounting for Developers – Modern Treasury",
                url: "https://www.moderntreasury.com/journal/accounting-for-developers-part-i",
              },
              {
                label: "Double-entry bookkeeping in SQL – Brandur",
                url: "https://brandur.org/accountant",
              },
              {
                label: "Ledger patterns for fintech – Martin Fowler",
                url: "https://martinfowler.com/bliki/AccountingNarrative.html",
              },
            ],
          },
          {
            title: "Fraud signals & risk scoring",
            task: "Build: Add a basic rule-based fraud score to a payment API. Block + flag high-risk transactions.",
            tag: "build",
            links: [
              {
                label: "Fraud detection patterns – Stripe Radar",
                url: "https://stripe.com/docs/radar/rules",
              },
              {
                label: "ML-free rule-based fraud detection – Shopify",
                url: "https://engineering.shopify.com/blogs/engineering/implementing-clear-and-effective-fraud-rules-to-protect-buyers",
              },
              {
                label: "Real-time fraud scoring with Redis",
                url: "https://redis.com/solutions/use-cases/fraud-detection/",
              },
            ],
          },
          {
            title: "PCI DSS basics",
            task: "Read PCI DSS SAQ-A summary. Audit a mock checkout flow against each requirement.",
            tag: "read",
            links: [
              {
                label: "PCI DSS SAQ-A guide – PCI Security Council",
                url: "https://www.pcisecuritystandards.org/document_library/",
              },
              {
                label: "PCI compliance for developers – Stripe blog",
                url: "https://stripe.com/guides/pci-compliance",
              },
              {
                label: "PCI DSS requirements explained – Verizon",
                url: "https://enterprise.verizon.com/resources/reports/pci-compliance-report/",
              },
            ],
          },
        ],
      },
      {
        week: "Week 19",
        weekSub: "Codebase leadership",
        days: [
          {
            title: "Writing design docs",
            task: "Write: A real RFC for a feature you've built before. Use the 6-section format: context / problem / options / decision / tradeoffs / open questions.",
            tag: "build",
            links: [
              {
                label: "RFC template – Rust community style",
                url: "https://github.com/rust-lang/rfcs/blob/master/0000-template.md",
              },
              {
                label: "Design docs at Google – Malte Ubl",
                url: "https://www.industrialempathy.com/posts/design-docs-at-google/",
              },
              {
                label: "How to write an engineering RFC – Squarespace",
                url: "https://engineering.squarespace.com/blog/2019/the-power-of-yes-if",
              },
            ],
          },
          {
            title: "Review quality",
            task: "Read 'How to do a code review' (Google eng practices). Review 3 open PRs on a public GitHub repo. Leave real comments.",
            tag: "read",
            links: [
              {
                label: "How to do a code review – Google Eng Practices",
                url: "https://google.github.io/eng-practices/review/reviewer/",
              },
              {
                label: "Code review best practices – Michaela Greiler",
                url: "https://www.michaelagreiler.com/code-review-best-practices/",
              },
              {
                label: "Giving helpful feedback – Stripe engineering",
                url: "https://stripe.com/blog/engineering",
              },
            ],
          },
          {
            title: "Reducing complexity",
            task: "Reflect: Pick one system you own. Write down every implicit assumption baked in. Which assumptions are load-bearing lies?",
            tag: "reflect",
            links: [
              {
                label:
                  "A Philosophy of Software Design – John Ousterhout (talk)",
                url: "https://www.youtube.com/watch?v=bmSAYlu0NcY",
              },
              {
                label: "Simple Made Easy – Rich Hickey",
                url: "https://www.youtube.com/watch?v=SxdOUGdseq4",
              },
              {
                label: "The Mess We're In – Joe Armstrong (GoTo)",
                url: "https://www.youtube.com/watch?v=lKXe3HUG2l4",
              },
            ],
          },
          {
            title: "Mentorship & alignment",
            task: "Watch Staff Eng podcast episode on 'what makes a good technical lead'. Write your own definition of Staff.",
            tag: "watch",
            links: [
              {
                label: "Staff Engineer podcast – Will Larson",
                url: "https://staffeng.com/stories/",
              },
              {
                label: "What is a Staff Engineer? – Tanya Reilly",
                url: "https://noidea.dog/staff",
              },
              {
                label: "Being Glue – Tanya Reilly (talk)",
                url: "https://www.youtube.com/watch?v=5cr2Yn_MrKg",
              },
            ],
          },
          {
            title: "Boring systems",
            task: "Reflect: What would it take to make your most fragile current system boring? Write the incident runbook for it.",
            tag: "reflect",
            links: [
              {
                label: "In Praise of Boring Technology – Dan McKinley",
                url: "https://mcfunley.com/choose-boring-technology",
              },
              {
                label: "Runbook template – Atlassian",
                url: "https://www.atlassian.com/incident-management/runbook",
              },
              {
                label: "SRE incident management – Google",
                url: "https://sre.google/sre-book/managing-incidents/",
              },
            ],
          },
        ],
      },
      {
        week: "Week 20–21",
        weekSub: "Synthesis & positioning",
        days: [
          {
            title: "System design with tradeoffs",
            task: "Build: Design a payment processing system on paper. Constraints: 10k TPS, ≤200ms p99, 99.99% uptime. Write failure modes.",
            tag: "build",
            links: [
              {
                label: "System design primer – GitHub",
                url: "https://github.com/donnemartin/system-design-primer",
              },
              {
                label: "Designing a payment system – ByteByteGo",
                url: "https://blog.bytebytego.com/p/payment-system-design",
              },
              {
                label: "High availability patterns – AWS",
                url: "https://docs.aws.amazon.com/whitepapers/latest/real-time-communication-on-aws/high-availability-and-scalability-on-aws.html",
              },
            ],
          },
          {
            title: "Your Staff case study",
            task: "Write: A 1-page case study of a hard problem you solved. Use it as LinkedIn/outreach content.",
            tag: "build",
            links: [
              {
                label: "Staff engineer case studies – StaffEng.com",
                url: "https://staffeng.com/stories/",
              },
              {
                label: "Writing about technical work – Julia Evans",
                url: "https://jvns.ca/blog/2021/05/24/blog-about-what-you've-struggled-with/",
              },
              {
                label: "Technical writing guide – Google",
                url: "https://developers.google.com/tech-writing",
              },
            ],
          },
          {
            title: "Knowledge gaps audit",
            task: "Reflect: Re-read the original 14-point plan. Rate yourself 1–5 on each. Where's your remaining gap?",
            tag: "reflect",
            links: [
              {
                label: "Staff Engineer book – Will Larson (sample)",
                url: "https://staffeng.com/book",
              },
              {
                label: "Engineering ladder templates – progression.fyi",
                url: "https://progression.fyi/",
              },
              {
                label: "Backend engineer skills map – roadmap.sh",
                url: "https://roadmap.sh/backend",
              },
            ],
          },
          {
            title: "Pick next deep area",
            task: "Decide: After payments depth — identity, streaming, or infra? Research what companies in your target market need most.",
            tag: "reflect",
            links: [
              {
                label: "Streaming systems – Kafka docs",
                url: "https://kafka.apache.org/documentation/",
              },
              {
                label: "Identity infrastructure – Auth0 blog",
                url: "https://auth0.com/blog/",
              },
              {
                label: "State of backend engineering – The Pragmatic Engineer",
                url: "https://newsletter.pragmaticengineer.com/",
              },
            ],
          },
          {
            title: "Graduation",
            task: "Share your RFC doc, system design doc, and case study with one engineer you respect. Get feedback.",
            tag: "build",
            links: [
              {
                label: "Portfolio tips for engineers – swyx.io",
                url: "https://www.swyx.io/learn-in-public/",
              },
              {
                label: "How to get feedback on technical writing – Julia Evans",
                url: "https://jvns.ca/blog/2021/01/12/day-36--how-to-ask-good-questions/",
              },
              {
                label: "Staff Eng success stories – LeadDev",
                url: "https://leaddev.com/staffplus",
              },
            ],
          },
        ],
      },
    ],
  },
];

export const PHASE_COLORS = {
  p1: { bg: "#1a2e1f", badge: "#30d158", text: "#30d158" },
  p2: { bg: "#1a2230", badge: "#007aff", text: "#007aff" },
  p3: { bg: "#2a1e2e", badge: "#bf5af2", text: "#bf5af2" },
  p4: { bg: "#1e1b3a", badge: "#818cf8", text: "#818cf8" },
};

export const TAG_COLORS = {
  build: { bg: "#1a2e1f", color: "#30d158" },
  watch: { bg: "#1a2230", color: "#007aff" },
  read: { bg: "#2e2a1a", color: "#ff9f0a" },
  reflect: { bg: "#2a1e2e", color: "#bf5af2" },
};

function slugifySegment(value) {
  return String(value)
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .replace(/-{2,}/g, "-");
}

function buildSessionId(phase, week, day) {
  return [
    phase.phase,
    slugifySegment(week.week),
    slugifySegment(day.title),
  ].join("__");
}

const ALL_SESSIONS = PLAN.flatMap((phase) =>
  phase.weeks.flatMap((week) =>
    week.days.map((day) => ({
      ...day,
      id: day.id ?? buildSessionId(phase, week, day),
      phase: phase.phase,
      phaseLabel: phase.phaseLabel,
      phaseSub: phase.phaseSub,
      week: week.week,
      weekSub: week.weekSub,
    })),
  ),
).map((session, globalIndex) => ({ ...session, globalIndex }));

const SESSION_BY_LEGACY_INDEX = new Map(
  ALL_SESSIONS.map((session) => [session.globalIndex, session]),
);

export function getAllSessions() {
  return ALL_SESSIONS;
}

export function getSessionByLegacyIndex(index) {
  return SESSION_BY_LEGACY_INDEX.get(Number(index)) ?? null;
}

export function getSessionIdByLegacyIndex(index) {
  return getSessionByLegacyIndex(index)?.id ?? null;
}
