const fs = require('fs').promises;
const path = require('path');

const resourceName = process.argv[2];
if (!resourceName) {
  console.error('Please provide a resource name.');
  process.exit(1);
}

const capitalizedResourceName =
  resourceName.charAt(0).toUpperCase() + resourceName.slice(1);

const interfaceContent = `export interface ${capitalizedResourceName} {
  id: number;
  name: string;
}`;

const controllerContent = `import { Request, Response } from 'express';
import { query } from '../services/db';
import { ${capitalizedResourceName} } from '../interfaces/${capitalizedResourceName}';

export const get${capitalizedResourceName}s = async (req: Request, res: Response) => {
  try {
    const { rows } = await query('SELECT * FROM ${resourceName}s');
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: (err as Error).message });
  }
};

export const create${capitalizedResourceName} = async (req: Request, res: Response) => {
  try {
    const { name } = req.body;
    const { rows } = await query(
      'INSERT INTO ${resourceName}s (name) VALUES ($1) RETURNING *',
      [name]
    );
    res.status(201).json(rows[0]);
  } catch (err) {
    res.status(500).json({ error: (err as Error).message });
  }
};

export const update${capitalizedResourceName} = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { name } = req.body;
    const { rows } = await query(
      'UPDATE ${resourceName}s SET name = $1 WHERE id = $2 RETURNING *',
      [name, id]
    );
    if (rows.length === 0) {
      return res.status(404).json({ error: '${capitalizedResourceName} not found' });
    }
    res.json(rows[0]);
  } catch (err) {
    res.status(500).json({ error: (err as Error).message });
  }
};

export const delete${capitalizedResourceName} = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { rows } = await query('DELETE FROM ${resourceName}s WHERE id = $1 RETURNING *', [id]);
    if (rows.length === 0) {
      return res.status(404).json({ error: '${capitalizedResourceName} not found' });
    }
    res.status(204).send();
  } catch (err) {
    res.status(500).json({ error: (err as Error).message });
  }
};
`;

const routesContent = `import { Router } from 'express';
import {
  get${capitalizedResourceName}s,
  create${capitalizedResourceName},
  update${capitalizedResourceName},
  delete${capitalizedResourceName},
} from '../controllers/${resourceName}Controller';

const router = Router();

router.get('/', get${capitalizedResourceName}s);
router.post('/', create${capitalizedResourceName});
router.put('/:id', update${capitalizedResourceName});
router.delete('/:id', delete${capitalizedResourceName});

export default router;
`;

const sqlContent = `
CREATE TABLE ${resourceName}s (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL
);
`;

async function generateResource() {
  try {
    // Create files
    await fs.writeFile(path.join(__dirname, \`../src/interfaces/${capitalizedResourceName}.ts\`), interfaceContent);
    await fs.writeFile(path.join(__dirname, \`../src/controllers/${resourceName}Controller.ts\`), controllerContent);
    await fs.writeFile(path.join(__dirname, \`../src/routes/${resourceName}Routes.ts\`), routesContent);

    // Append to init.sql
    await fs.appendFile(path.join(__dirname, '../init.sql'), sqlContent);

    // Update src/index.ts
    const indexPath = path.join(__dirname, '../src/index.ts');
    let indexContent = await fs.readFile(indexPath, 'utf-8');

    const importStatement = \`import ${resourceName}Routes from './routes/${resourceName}Routes';\`;
    const appUseStatement = \`app.use('/${resourceName}s', ${resourceName}Routes);\`;

    indexContent = indexContent.replace(
      "import { loggingMiddleware } from './middleware/logging';",
      \`import { loggingMiddleware } from './middleware/logging';\\n${importStatement}\`
    );
    indexContent = indexContent.replace(
      "app.use('/users', userRoutes);",
      \`app.use('/users', userRoutes);\\n${appUseStatement}\`
    );

    await fs.writeFile(indexPath, indexContent);

    console.log(\`Successfully generated resource: ${resourceName}\`);
  } catch (error) {
    console.error('Error generating resource:', error);
  }
}

generateResource();