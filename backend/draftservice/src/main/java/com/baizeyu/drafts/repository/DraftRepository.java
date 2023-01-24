package com.baizeyu.drafts.repository;

import com.baizeyu.drafts.model.Draft;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface DraftRepository extends MongoRepository<Draft, String> {

    Draft findDraftByTitle(String title);

    void deleteByTitle(String title);
}
