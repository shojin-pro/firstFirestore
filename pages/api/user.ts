import { database } from 'firebase-admin';
import type { NextApiRequest, NextApiResponse } from 'next';
import {useState} from 'react';
const { cert } = require('firebase-admin/app');
const { getFirestore } = require('firebase-admin/firestore');
const serviceAccount = require('../../firebase-test-serviceAccount.json'); // 秘密鍵を取得
const admin = require('firebase-admin');


export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const COLLECTION_NAME = process.env.COLLECTION_NAME;
  //　初期化する
  if (admin.apps.length === 0) {
    admin.initializeApp({
      credential: cert(serviceAccount),
    });
  }
  const db = getFirestore();
  const id = req.method === 'GET' ? req.query.id : req.body.id;
  if (req.method === 'POST') {
    if(!req.body.id){
      const createdId = db.collection(COLLECTION_NAME).doc().id;
      const insertData = {
        datano: '1',
        id : createdId,
        name: 'Symfo',
        email: 'symfo@example.com',
      };
      const docRef = db.collection(COLLECTION_NAME).doc(createdId);
      docRef.set(insertData).catch((error:unknown) => {
        return res.status(500).json({error:error});
      });
      res.status(200).json({id:createdId});
    }else{
      const doc = await db.collection(COLLECTION_NAME).doc(id).get().catch((error:unknown) => {
        return res.status(500).json({error:error});
      });
      if (doc.exists) {
        throw new Error(`already exists document!`);
      }
      const insertData = {
        datano: '1',
        name: 'Symfo',
        email: 'symfo@example.com',
      };
      const docRef = db.collection(COLLECTION_NAME).doc(id);
      docRef.set(insertData).catch((error:unknown)  => {
        return res.status(500).json({error:error});
      });
    }
  }else if(req.method === 'PATCH' || req.method === 'GET' || req.method === 'DELETE'){
      const doc = await db.collection(COLLECTION_NAME).doc(id).get().catch((error:unknown) => {
        return res.status(500).json({error:error});
      });
      if (doc.exists) {
        res.status(200).json({id:doc.id,data:doc.data()});
      } else {
        throw new Error(`No such document!`);
      }
      if(req.method === 'DELETE'){
        const docDel = await db.collection(COLLECTION_NAME).doc(id).delete().catch((error:unknown)  => {
          return res.status(500).json({error:error});
        });
      }else if(req.method === 'PATCH'){
        const docPat = db.collection(COLLECTION_NAME).doc(id);
        const updateData = {
            datano: '1',
            name: 'updateSynfo',
            email: 'updateSynfo@example.com',
        };
        docPat.set(updateData).catch((error:unknown) => {
          return res.status(500).json({error:error});
        });
      }
  }
  res.status(200).json({id:id});
}