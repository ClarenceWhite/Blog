package com.baizeyu.drafts.service;


import com.baizeyu.drafts.model.Draft;
import com.baizeyu.drafts.repository.DraftRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class DraftServiceImpl implements DraftService{

    @Autowired
    DraftRepository draftRepository;


    @Override
    public Map<String, Date> getAllDraftsTitle(){
        List<Draft> allDrafts = draftRepository.findAll();
        Map<String, Date> allTitles = new HashMap<>();

        for(Draft draft : allDrafts){
            String title = draft.getTitle();
            Date date = draft.getLast_modified();
            allTitles.put(title, date);
        }
        return allTitles;
    }

    @Override
    public Draft saveNewDraft(Draft draft){
        return draftRepository.save(draft);
    }

    @Override
    public Draft getByTitle(String title){
        return draftRepository.findDraftByTitle(title);
    }

    @Override
    public Boolean updateDraft(Draft newDraft, String old_title){

        //retrieve the draft by the old title
        Draft foundedDraft = draftRepository.findDraftByTitle(old_title);

        // check if the new title conflicts with other existing ones
        Set<String> existingTitles = getAllDraftsTitle().keySet();
        // if the new title conflicts with existing title, and the title has been changed
        if (existingTitles.contains(newDraft.getTitle()) && !old_title.equals(newDraft.getTitle())) {
            return false;
        } else {
            // delete the old version
            draftRepository.delete(foundedDraft);
            // save the new version
            draftRepository.save(newDraft);
            return true;
        }

    }

    @Override
    public Boolean deleteDraft(String title){
        //check if the draft exists
        Set<String> existingTitles = getAllDraftsTitle().keySet();
        if(existingTitles.contains(title)) {
            draftRepository.deleteByTitle(title);
            return true;
        } else {
            System.out.println("Draft doesn't exist!");
            return false;
        }
    }
}
