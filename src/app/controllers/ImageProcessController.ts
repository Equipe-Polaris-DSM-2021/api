import { Request, Response } from "express";
import { PythonShell } from 'python-shell';
import 'dotenv/config'

class ImageProcessController {
  async index(req: Request, res: Response) {
    const { bandURL, satellite } = req.body

    let options = {
      mode: undefined,
      pythonPath: '/bin/python3',
      pythonOptions: ['-u'], // get print results in real-time
      scriptPath: '/home/gabriel/Documentos/FATEC/Semestre\ 2/API/dev/api/pythonCodes',
      args: [bandURL, satellite]
    };

    await PythonShell.run('imageProcess.py', options, function (err: any, results: any) {
      if (err) console.log(err);
      // results is an array consisting of messages collected during execution
      console.log('results: %j', results);
    });

    res.json({"message": "python teste"})
  }
}

export default new ImageProcessController;
