package com.baizeyu.drafts.controller;


import com.baizeyu.drafts.model.Draft;
import com.baizeyu.drafts.service.DraftService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Date;
import java.util.Map;
import java.util.Set;

@CrossOrigin(origins = "*", allowedHeaders = "*", maxAge = 3600)
@RestController
public class DraftController {

    @Autowired
    DraftService draftService;

    // this is used to get all titles of drafts
    @RequestMapping(value = "/api/drafts", method = RequestMethod.GET)
    public ResponseEntity<Map> getAllDraftsTitle(){

        Map<String, Date> draftTitleMap;

        try{
            draftTitleMap = draftService.getAllDraftsTitle();
            return new ResponseEntity<>(draftTitleMap, HttpStatus.OK);
        } catch(Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }

    // this is used to receive POST requests for new drafts
    @RequestMapping(value = "api/drafts", method = RequestMethod.POST)
    public ResponseEntity<String> saveDraft(@RequestBody Draft draft){
        try{
            Set<String> existingTitles = draftService.getAllDraftsTitle().keySet();
            if (existingTitles.contains(draft.getTitle())) {
                System.out.println("Title already exists!");
                return new ResponseEntity<>("Title already exists!", HttpStatus.BAD_REQUEST);
            } else {
                System.out.println("Valid draft, saving...");
                draftService.saveNewDraft(draft);
                return new ResponseEntity<>("New draft saved successfully!", HttpStatus.OK);
            }

        } catch(Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }

    // this is used to get a single draft by its title
    @RequestMapping(value = "/api/drafts/{title}", method = RequestMethod.GET)
    public ResponseEntity<?> getDraftByTitle(@PathVariable String title){

        Draft matched_draft;

        try{
            System.out.println("Getting draft: " + title + "...");
            matched_draft = draftService.getByTitle(title);
            return new ResponseEntity<>(matched_draft, HttpStatus.OK);
        } catch(Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }

    // this is used to update an existing single draft
    @RequestMapping(value = "/api/drafts/{old_title}", method = RequestMethod.PUT)
    public ResponseEntity<?> updateDraft(@RequestBody Draft newDraft, @PathVariable String old_title){

        try{
            if (draftService.updateDraft(newDraft, old_title)) {
                System.out.println("Valid new draft, updating...");
                return new ResponseEntity<>("Updated successfully!", HttpStatus.OK);
            } else {
                System.out.println("Title of new draft has conflict with others'...");
                return new ResponseEntity<>("New title conflict!", HttpStatus.BAD_REQUEST);
            }
        } catch(Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }

    // delete a draft
    @RequestMapping(value = "/api/drafts/{title}", method = RequestMethod.DELETE)
    public ResponseEntity<?> deleteDraft(@PathVariable String title){
        try{
            System.out.println("Deleting draft:" + title);
            if(draftService.deleteDraft(title)){
                return new ResponseEntity<>("Deleted draft successfully!", HttpStatus.OK);
            } else {
                return new ResponseEntity<>("Draft doesn't exist!", HttpStatus.BAD_REQUEST);
            }
        }catch(Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }

}
