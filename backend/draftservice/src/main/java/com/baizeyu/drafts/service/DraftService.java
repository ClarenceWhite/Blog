package com.baizeyu.drafts.service;

import com.baizeyu.drafts.model.Draft;

import java.util.Date;
import java.util.Map;


public interface DraftService {

    Map<String, Date> getAllDraftsTitle();

    Draft saveNewDraft(Draft draft);

    Draft getByTitle(String title);

    Boolean updateDraft(Draft newDraft, String title);

    Boolean deleteDraft(String title);
}
