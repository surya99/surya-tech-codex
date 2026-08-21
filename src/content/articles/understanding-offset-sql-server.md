---
title: "Understanding OFFSET in SQL Server"
description: "Learn how OFFSET and FETCH work together to implement pagination in SQL Server."
publishedDate: 2026-08-21
category: "SQL Server"
tags: ["sql-server", "pagination", "database"]
featured: true
readingTime: "3 min read"
---

`OFFSET` in SQL Server is used to skip a specific number of rows from a query result.

One important thing to remember is that `OFFSET` cannot be used alone. It must be used with an `ORDER BY` clause.

## Why is ORDER BY required?

Without `ORDER BY`, SQL Server does not have a defined order for the rows. It therefore cannot reliably determine which first 10, 100, or 1,000 rows should be skipped.

If we want to skip the first 100 records and fetch the next 50, we can write:

```sql
SELECT *
FROM Employee
ORDER BY Id ASC
OFFSET 100 ROWS
FETCH NEXT 50 ROWS ONLY;
```

Here:

- `ORDER BY Id ASC` defines the order of the records.
- `OFFSET 100 ROWS` skips the first 100 records.
- `FETCH NEXT 50 ROWS ONLY` returns the next 50 records.

## Where is it useful?

This pattern is commonly used when implementing pagination in a UI. Instead of loading thousands of employee records at once, the application fetches only the records required for the current page.

For very deep pages, however, OFFSET pagination can become expensive because the database still has to process the skipped rows. In those scenarios, keyset pagination is often a better choice.
